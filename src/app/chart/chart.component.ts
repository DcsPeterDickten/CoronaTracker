import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  showYAxisLabel = true;
  yAxisLabel = 'Anzahl Erkrankter (geglättet)';

  @Input()
  data: any;
}
