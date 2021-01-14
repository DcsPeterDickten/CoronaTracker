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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCityData();

    // if (!String.prototype.startsWith) {
    //   Object.defineProperty(String.prototype, 'startsWith', {
    //     value: function (search, rawPos) {
    //       var pos = rawPos > 0 ? rawPos | 0 : 0;
    //       return this.substring(pos, pos + search.length) === search;
    //     }
    //   });
    // }

  }

  loadCityData(): void {
    const ID = Math.round(Math.random() * 100000000);

    this.http
      .get(environment.CITY_URL, { responseType: 'text' })
      .subscribe((data) => {
        this.rawCityData = data
          .split('\r\n')
          .map((zeile) => zeile.split(','))
          .filter(this.isInterestingCity)
          .map(this.cleanCityData);
      });
  }

  cleanCityData(cityData: any) {

    let count = (cityData[2] || '') as string;
    if (count[0] === '"') {
      cityData[2] = count.substring(1, 100);
    }

    return cityData;
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
    return (
      !!city &&
      city.length > 0 &&
      city[0] !== 'Stadt/ <br> Landkreis' &&
      city[0] !== ' ()'
    );
  }
}
