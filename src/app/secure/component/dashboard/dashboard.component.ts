// dashboard.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {DocumentService} from "../../../services/document.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;

  dashboardStats = {
    numberOfContracts: 0,
    numberOfInvoices: 0,
    numberOfDocuments: 0,
    pieChartData: [3, 2, 4],
    lineChartData: [1200, 1400, 1300, 1500, 1600, 1800, 1700],
    lineChartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  constructor( private documentService: DocumentService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadDashboardCounts();
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.createLineChart();
  }

  loadDashboardCounts(): void {
    this.documentService.getDashboardCounts().subscribe(
      (data) => {
        this.dashboardStats.numberOfContracts = data.contracts;
        this.dashboardStats.numberOfInvoices = data.invoices;
        this.dashboardStats.numberOfDocuments = data.documents;
        this.dashboardStats.pieChartData = [data.contracts, data.invoices, data.documents];

      },
      (error) => {
        console.error('There was an error retrieving the dashboard counts', error);
      }
    );
  }

  createPieChart() {
    const pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Contracts', 'Invoices', 'Documents'],
        datasets: [{
          data: this.dashboardStats.pieChartData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createLineChart() {
    const lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.dashboardStats.lineChartLabels,
        datasets: [{
          label: 'Monthly Invoices ($)',
          data: this.dashboardStats.lineChartData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
