import { Component, OnInit } from '@angular/core';
import { ChartService } from '../service/chart.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private _chartService :  ChartService) { }

  ngOnInit() {
    this.getChartData();

  }

  getChartData() {
  this._chartService.getChartDataFromApi().subscribe((data:any) => { 
    console.log(data);
    this.chartDataPoint(data);
  })
  }

  chartDataPoint (data : any) {
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = data

// Set input format for the dates

// Create axes
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "y";
series.dataFields.dateX = "x";
series.tooltipText = "{value}"
series.strokeWidth = 2;

// Drop-shaped tooltips
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.strokeOpacity = 0;
series.tooltip.pointerOrientation = "vertical";
series.tooltip.label.minWidth = 40;
series.tooltip.label.minHeight = 40;
series.tooltip.label.textAlign = "middle";
series.tooltip.label.textValign = "middle";

// Make bullets grow on hover
let bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.circle.strokeWidth = 2;
bullet.circle.radius = 4;
bullet.circle.fill = am4core.color("#fff");

let bullethover = bullet.states.create("hover");

// Make a panning cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panXY";
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = series;

// Create vertical scrollbar and place it before the value axis
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.parent = chart.leftAxesContainer;
chart.scrollbarY.toBack();


dateAxis.start = 0.79;
dateAxis.keepSelection = true;
  }

}
