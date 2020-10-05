import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prognose',
  templateUrl: './prognose.component.html',
  styleUrls: ['./prognose.component.css']
})
export class PrognoseComponent implements OnInit {

  @Input()
  dataIsBroken: boolean = false;

  @Input()
  noOfRecords: number = 0;

  @Input()
  daysUntilEndOfCrisis: number = 0;

  ngOnInit(): void {
  }

}
