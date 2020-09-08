import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseRequestService } from 'src/app/services/database-request.service';

@Component({
  selector: 'app-forest-statistics',
  templateUrl: './forest-statistics.component.html',
  styleUrls: ['./forest-statistics.component.css']
})
export class ForestStatisticsComponent implements OnInit {

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
      { label: 'confirmed issues', data: [] },
      { label: 'declined issues', data: [] },
      { label: 'unconfirmed issues', data: [] }
    ];
  }

  public getUserCredentials() {
    this.databaseRequestService.requestUserCredentials()
      .subscribe(
        (response: any) => {
          this.getForesterIssuesStatistics(response.id);
        },
      );
  }

  public getForesterIssuesStatistics(userID: number) {
    this.databaseRequestService.requestForesterIssuesStatistics(userID)
      .subscribe(
        (response: any) => {
          this.barChartLabels.push(new Date().toISOString().split('T')[0]);
          this.barChartData[0].data.push(response.confirmed);
          this.barChartData[1].data.push(response.declined);
          this.barChartData[2].data.push(response.neconfirmed);
        }
      )
  }

}
