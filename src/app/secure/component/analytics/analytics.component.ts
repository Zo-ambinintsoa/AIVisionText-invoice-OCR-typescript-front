import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  lineChartData: ChartDataset[] = [];
  lineChartLabels = [];
  barChartData: ChartDataset[] = [];
  barChartLabels = [];
  pieChartData: number[] = [];
  pieChartLabels = [];
  chartOptions: ChartOptions = { responsive: true };

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.http.get('/assets/chart-data.json').subscribe((data: any) => {
      this.lineChartData = data.lineChartData;
      this.lineChartLabels = data.lineChartLabels;
      this.barChartData = data.barChartData;
      this.barChartLabels = data.barChartLabels;
      this.pieChartData = data.pieChartData;
      this.pieChartLabels = data.pieChartLabels;

      this.createCharts();
    });
  }

  createCharts(): void {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData
      },
      options: this.chartOptions
    });

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData
      },
      options: this.chartOptions
    });

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{ data: this.pieChartData }]
      },
      options: this.chartOptions
    });
  }
}
