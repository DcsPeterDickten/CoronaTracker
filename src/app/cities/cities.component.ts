import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'corona-cities',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
  rawCityData = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCityData();
  }

  loadCityData(): void {
    const ID = Math.round(Math.random() * 100000000);

    this.http
      .get(environment.CITY_URL, { responseType: 'text' })
      .subscribe((data) => {
        this.rawCityData = data
          .split('\r\n')
          .map((zeile) => zeile.split(','))
          .filter(this.isInterestingCity);
      });
  }

  getColorForInzidenz(i: number) {
    if (+i < 35) {
      return 'white';
    }
    if (+i < 50) {
      return '#f3e677';
    }
    return '#f25f5f';
  }

  isInterestingCity(city: Array<string>): boolean {
    const LIST_OF_CITIES = [
      'erlangen',
      'coburg',
      'bamberg',
      'fürth',
      'nürnberg',
      '/landkreis',
      'münchen'];

    let RESULT = false;

    if (!city || !city.length) {
      return false;
    }

    if (+city[2] >= 30) {
      return true;
    }

    const NAME: string = (city[0] || '').toLocaleLowerCase();

    LIST_OF_CITIES.forEach((c) => {
      if (NAME.indexOf(c) >= 0) {
        RESULT = true;
        return;
      }
    });

    return RESULT;
  }
}
