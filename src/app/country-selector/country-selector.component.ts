import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../country.interface';

@Component({
  selector: 'corona-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent {

  @Input()
  currentCountry: string = 'germany';

  @Input()
  allCountries: Array<Country> = [];

  @Output()
  selectedNewCountry: EventEmitter<string> = new EventEmitter<string>();

  countrySelected(event) {
    this.selectedNewCountry.emit(event);
  }
}
