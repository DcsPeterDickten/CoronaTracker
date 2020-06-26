// tslint:disable-next-line: max-line-length
// tslint:disable: max-line-length

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  COUNTRY = 'germany';
  URL = 'https://api.covid19api.com/total/country/';
  title = 'Corona';
  graphData = [];
  tableData = [];
  countries = [];
  averageDecline = 0;
  days = 0;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  showYAxisLabel = true;
  yAxisLabel = 'Anzahl Erkrankter (geglättet)';

  ngOnInit(): void {
    this.loadCountries();
    this.loadInfectionData(this.COUNTRY);
  }

  isDataBroken(): boolean {
    return this.tableData && this.tableData.length && this.tableData[0].deaths === 0;
  }


  updateData() {
    this.loadInfectionData(this.COUNTRY);
  }
  loadCountries(): void {
    this.http.get<Array<any>>('https://api.covid19api.com/countries').subscribe(
      (data) => {
        this.countries = data.map(this.convertCountry).sort(this.compareNameOfCountries);
      }
    );
  }

  compareNameOfCountries(a: any, b: any): number {
    return a.name.localeCompare(b.name);
  }

  convertCountry(c: any): any {
    return { id: c.Slug, name: c.Country };
  }

  loadInfectionData(country: string) {
    this.http.get<Array<any>>(this.URL + country).subscribe(
      (data) => {
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

  cleanupList(list: Array<any>): Array<any> {
    return list.filter(this.hasData);
  }

  convertInfectionData = (e: any): any => {
    return {
      datum: this.extractDate(e.Date),
      anzahl: e.Active || e.Confirmed - e.Deaths - e.Recovered,
      deaths: e.Deaths
    };
  }

  filterInfectionData = (e: any): boolean => {

    // an diesem Tag sind die Daten in der Quelle kaputt
    if (e.Date && e.Date.indexOf('2020-06-24T') === 0) {
      return false;
    }

    // weder krank noch gestorben gibt es nur in Nordkorea ;-)
    return !!(e.Active || e.Deaths);
  }


  extractDate(d: string): string {
    return d.substr(0, d.indexOf('T'));
  }

  glaetten(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const amRand = (index === 0 || index === rawData.length - 1);
      const anzahl = Math.round(amRand ? eintrag.anzahl : (rawData[index - 1].anzahl + rawData[index].anzahl + rawData[index + 1].anzahl) / 3);
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff });
    });
    return result;
  }

  convertRaw(rawData: Array<any>): Array<any> {
    const result = [];
    rawData.forEach((eintrag, index) => {
      const anzahl = eintrag.anzahl;
      const diff = index === 0 ? anzahl : anzahl - result[index - 1].value;
      result.push({ name: eintrag.datum, value: anzahl, diff, deaths: eintrag.deaths });
    });
    return result;
  }
  hasData(eintrag: any): boolean {
    return (eintrag.diff !== 0 || eintrag.deaths !== 0);
  }

}
