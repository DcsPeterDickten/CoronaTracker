// tslint:disable: max-line-length
import { Component, OnInit } from '@angular/core';
import { RowData } from './row-data.interface';
import { environment } from 'src/environments/environment';
import { Country } from './country.interface';
import { CountryDataService } from './country-data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TreeMapModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'corona-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private countryDataService: CountryDataService, private activatedRoute: ActivatedRoute) { }

  selectedCountry = '';
  graphData = [];
  tableData: Array<RowData> = [];
  countries: Array<Country> = environment.COUNTRIES;
  days = 0;
  private averageDecline = 0;

  // ===========================================================================================

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.selected(params['c']);
      });
  }

  // ===========================================================================================

  isValidCountryID(countryId: string) {
    return countryId && environment.COUNTRIES.map(c => c.id).find(cid => cid === countryId);
  }

  // ===========================================================================================

  hasEnoughData(): boolean {
    return this.graphData.length > 3;
  }

  // ===========================================================================================

  selected(countryId) {
    this.selectedCountry = (this.isValidCountryID(countryId)) ? countryId : 'germany';
    this.loadInfectionData();
  }

  // ===========================================================================================

  private isDataBroken(): boolean {
    return false;
    // return this.tableData && this.tableData.length > 0;
  }

  // ===========================================================================================

  private loadInfectionData() {

    let observer = this.countryDataService.getCountryData(this.selectedCountry);

    observer.subscribe(
      (data) => {

        this.countryDataService.writeCache(this.selectedCountry, data);
        let rawData = this.getRawData(data);
        this.graphData = this.getGraphData(rawData);
        this.tableData = this.getTableData(rawData);

        this.averageDecline = 0;
        this.days = 0;
        const anzahlTage = this.graphData.length;

        if (anzahlTage >= 5) {
          this.averageDecline = (this.graphData[anzahlTage - 5].diff + this.graphData[anzahlTage - 4].diff + this.graphData[anzahlTage - 3].diff + this.graphData[anzahlTage - 2].diff + this.graphData[anzahlTage - 1].diff) / 5;
          if (this.averageDecline < 0) {
            this.days = Math.round(this.graphData[anzahlTage - 1].value / Math.abs(this.averageDecline));
          }
        }
      }
    );
  }

  // ===========================================================================================

  private getTableData(data) {
    const rawData = this.convertRaw(data);
    return this.cleanupList(rawData.slice().reverse());
  }

  // ===========================================================================================

  private getRawData(data) {
    return data.filter(this.filterInfectionData).map(this.convertInfectionData);
  }

  // ===========================================================================================

  private getGraphData(rawData: Array<any>): Array<any> {
    const result = [];
    const dp: DatePipe = new DatePipe('de-de');
    dp.transform('')

    rawData.forEach((eintrag, index) => {
      const amRand = (index === 0 || index === rawData.length - 1);
      const anzahl = Math.round(amRand ? eintrag.anzahl : (rawData[index - 1].anzahl + rawData[index].anzahl + rawData[index + 1].anzahl) / 3);
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({
        // name: eintrag.datum,
        name: dp.transform(eintrag.datum, 'dd.MM.yyyy'),
        value: Math.max(0, anzahl), diff
      });
    });
    return result;
  }

  // ===========================================================================================

  private cleanupList(list: Array<any>): Array<RowData> {
    return list.filter(this.hasData);
  }

  // ===========================================================================================

  private convertInfectionData = (e: any): any => {
    return {
      datum: this.extractDate(e.Date),
      anzahl: e.Active || e.Confirmed - e.Deaths - e.Recovered,
      deaths: e.Deaths
    };
  }

  // ===========================================================================================

  private filterInfectionData = (e: any): boolean => {

    // an diesem Tag sind die Daten in der Quelle kaputt
    if (e.Date && e.Date.indexOf('2020-06-24T') === 0) {
      return false;
    }

    // an diesem Tag sind die Daten in der Quelle kaputt
    if (e.Date && e.Date.indexOf('2020-07-08T') === 0) {
      return false;
    }

    // // an diesem Tag sind die Daten in der Quelle kaputt
    // if (e.Date && e.Date.indexOf('2020-10-28T') === 0) {
    //   return false;
    // }

    // remove corrupt data from Canada
    if (this.selectedCountry === 'canada' && e.Date && e.Date < '2020-07-21') {
      return false;
    }

    // keiner krank gibt es nur in Nordkorea ;-)
    return !!(e.Active);
  }

  // ===========================================================================================

  private extractDate(d: string): string {
    return d.substr(0, d.indexOf('T'));
  }

  // ===========================================================================================

  private convertRaw(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const anzahl = Math.max(0, eintrag.anzahl);
      const deaths = eintrag.deaths;
      const diff = index === 0 ? anzahl : anzahl - Math.max(0, result[index - 1].value);
      const diffDeaths = Math.max(0, index === 0 ? deaths : deaths - Math.max(0, result[index - 1].deaths));
      result.push({ date: eintrag.datum, value: anzahl, diff, deaths: eintrag.deaths, diffDeaths });
    });
    return result;
  }

  // ===========================================================================================

  private hasData(eintrag: RowData): boolean {
    return !!eintrag.value || !!eintrag.diff || !!eintrag.deaths || !!eintrag.diffDeaths;
  }

}
