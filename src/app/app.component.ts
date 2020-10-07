// tslint:disable: max-line-length
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RowData } from './row-data.interface';
import { environment } from 'src/environments/environment';
import { Country } from './country.interface';
import { of } from 'rxjs';

@Component({
  selector: 'corona-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private cache = {};

  selectedCountry = 'germany';
  graphData = [];
  tableData: Array<RowData> = [];
  countries: Array<Country> = environment.COUNTRIES;
  days = 0;

  private averageDecline = 0;

  ngOnInit(): void {
    this.loadInfectionData();
  }

  hasEnoughData(): boolean {
    return this.graphData.length > 3 && !this.isDataBroken();
  }

  selected(newCountry) {
    this.selectedCountry = newCountry;
    this.loadInfectionData();
  }

  // ===========================================================================================

  private isDataBroken(): boolean {
    return this.tableData && this.tableData.length && this.tableData[0].deaths === 0;
  }

  private loadInfectionData() {
    const country = this.selectedCountry || 'germany';

    let observer = null

    if (this.cache[country]) {
      observer = of(this.cache[country]);
    } else {
      observer = this.http.get<Array<any>>(environment.URL + country);
    }
    observer.subscribe(
      (data) => {
        this.cache[country] = data;
        let rawData = data.filter(this.filterInfectionData).map(this.convertInfectionData);
        this.graphData = this.glaetten(rawData);
        rawData = this.convertRaw(rawData);
        this.averageDecline = 0;
        this.days = 0;
        const anzahlTage = this.graphData.length;
        if (anzahlTage >= 3) {
          this.averageDecline = (this.graphData[anzahlTage - 3].diff + this.graphData[anzahlTage - 2].diff + this.graphData[anzahlTage - 1].diff) / 3;
          if (this.averageDecline < 0) {
            this.days = Math.round(this.graphData[anzahlTage - 1].value / Math.abs(this.averageDecline));
          }
        }
        this.tableData = this.cleanupList(rawData.slice().reverse());
      }
    );
  }

  private cleanupList(list: Array<any>): Array<RowData> {
    return list.filter(this.hasData);
  }

  private convertInfectionData = (e: any): any => {
    return {
      datum: this.extractDate(e.Date),
      anzahl: e.Active || e.Confirmed - e.Deaths - e.Recovered,
      deaths: e.Deaths
    };
  }

  private filterInfectionData = (e: any): boolean => {

    // an diesem Tag sind die Daten in der Quelle kaputt
    if (e.Date && e.Date.indexOf('2020-06-24T') === 0) {
      return false;
    }

    if (e.Date && e.Date.indexOf('2020-07-08T') === 0) {
      return false;
    }

    // weder krank noch gestorben gibt es nur in Nordkorea ;-)
    return !!(e.Active || e.Deaths);
  }

  private extractDate(d: string): string {
    return d.substr(0, d.indexOf('T'));
  }

  private glaetten(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const amRand = (index === 0 || index === rawData.length - 1);
      const anzahl = Math.round(amRand ? eintrag.anzahl : (rawData[index - 1].anzahl + rawData[index].anzahl + rawData[index + 1].anzahl) / 3);
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff });
    });
    return result;
  }

  private convertRaw(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const anzahl = eintrag.anzahl;
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff, deaths: eintrag.deaths });
    });
    return result;
  }

  private hasData(eintrag: RowData): boolean {
    return (eintrag.diff !== 0 || eintrag.deaths !== 0);
  }
}
