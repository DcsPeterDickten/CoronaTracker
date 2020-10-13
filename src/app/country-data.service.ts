import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CountryDataService {

  private cache = {};

  constructor(private http: HttpClient) {
  }

  getCountryData(selectedCountry) {

    const country = selectedCountry || 'germany';

    let observer = null

    if (this.cache[country]) {
      observer = of(this.cache[country]);
    } else {
      observer = this.http.get<Array<any>>(environment.URL + country);
    }
    return observer;
  }

  writeCache(selectedCountry: string, data: any) {
    const country = selectedCountry || 'germany';
    this.cache[country] = data;
  }

}
