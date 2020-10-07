import { Component, Input } from '@angular/core';
import { RowData } from '../row-data.interface';

@Component({
  selector: 'corona-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input()
  public tableData: Array<RowData>;

  rowColor(row: any) {
    return row.diff > 0 ? '#f25f5f' : '#7dda73';
  }
}
