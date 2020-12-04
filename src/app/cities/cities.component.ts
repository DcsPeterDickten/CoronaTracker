import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'corona-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  rawCityData = [];

  constructor(private http: HttpClient) {}

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

  getClassForInzidenz(inzidenz: number) {
    if (+inzidenz < 35) {
      return 'below35';
    }
    if (+inzidenz < 50) {
      return 'below50';
    }

    if (+inzidenz < 100) {
      return 'below100';
    }

    if (+inzidenz < 200) {
      return 'below200';
    }

    if (+inzidenz < 300) {
      return 'below300';
    }

    return 'above300';
  }

  isInterestingCity(city: Array<string>): boolean {
    // const LIST_OF_CITIES = [
    //   'erlangen',
    //   'coburg',
    //   'bamberg',
    //   'donau-ries',
    //   'fürth',
    //   'nürnberg',
    //   '/landkreis',
    //   'münchen'];

    // let RESULT = false;

    // if (!city || !city.length) {
    //   return false;
    // }

    // return true;

    return !!city && city.length > 0 && city[0] !== 'Stadt/ <br> Landkreis';

    // if (+city[2] >= 30) {
    //   return true;
    // }

    // const NAME: string = (city[0] || '').toLocaleLowerCase();

    // LIST_OF_CITIES.forEach((c) => {
    //   if (NAME.indexOf(c) >= 0) {
    //     RESULT = true;
    //     return;
    //   }
    // });

    // return RESULT;
  }
}
