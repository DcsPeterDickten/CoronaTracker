import { Component, Input } from '@angular/core';

@Component({
  selector: 'corona-prognose',
  templateUrl: './prognose.component.html'
})
export class PrognoseComponent {

  @Input()
  dataIsBroken: boolean = false;

  @Input()
  noOfRecords: number = 0;

  @Input()
  daysUntilEndOfCrisis: number = 0;

}
