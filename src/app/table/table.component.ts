import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input()
  public tableData: Array<any>

  rowColor(row: any) {
    return row.diff > 0 ? 'red' : 'green';
  }

}
