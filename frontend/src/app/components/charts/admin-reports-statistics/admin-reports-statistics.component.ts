import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseRequestService } from 'src/app/services/database-request.service';

@Component({
  selector: 'app-admin-reports-statistics',
  templateUrl: './admin-reports-statistics.component.html',
  styleUrls: ['./admin-reports-statistics.component.css']
})
export class AdminReportsStatisticsComponent implements OnInit {

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend;
  public barChartPlugins;
  public barChartColors: Color[];
  public barChartData: ChartDataSets[];

  constructor(private databaseRequestService: DatabaseRequestService) {
    this.initChartData();
    this.getUserCredentials();
  }

  ngOnInit() {
  }

  public initChartData() {
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartLabels = [];

    this.barChartColors = [
      { backgroundColor: 'red' },
      { backgroundColor: '#00E68A' },
      { backgroundColor: '#FF9810' },
    ];

    this.barChartData = [
      { label: 'forester access requests', data: [] },
      { label: 'new forests issues reports', data: [] },
      { label: 'new users', data: [] }
    ];
  }

  public getUserCredentials() {
    this.databaseRequestService.requestUserCredentials()
      .subscribe(
        (response: any) => {
          this.getAdminReportsStatistics(response.id);
        },
      );
  }

  public getAdminReportsStatistics(userID: number) {
    this.databaseRequestService.requestAdminReportsStatistics(userID)
      .subscribe(
        (response: any) => {
          this.barChartLabels.push(new Date().toISOString().split('T')[0]);
          this.barChartData[0].data.push(response.foresterRequests);
          this.barChartData[1].data.push(response.issues);
          this.barChartData[2].data.push(response.newUsers);
        }
      )
  }

}
