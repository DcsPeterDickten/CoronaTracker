import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
