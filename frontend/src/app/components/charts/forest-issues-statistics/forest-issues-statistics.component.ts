import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-forest-issues-statistics',
  templateUrl: './forest-issues-statistics.component.html',
  styleUrls: ['./forest-issues-statistics.component.css']
})
export class ForestIssuesStatisticsComponent implements OnInit {

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend;
  public barChartPlugins;
  public barChartColors: Color[];
  public barChartData: ChartDataSets[];

  constructor(private databaseRequestService: DatabaseRequestService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.currentDates.subscribe(dataSource => {
      this.initChartData();
      this.getForestIssuesStatistics(dataSource);
    });
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
      { label: 'reported problems', data: [] },
      { label: 'confirmed problems', data: [] },
      { label: 'declined problems', data: [] },
    ];
  }

  // Documentation: https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
  public getForestIssuesStatistics(data: object) {
    data['forestID'] = this.userPanelService.forestID;
    this.databaseRequestService.requestForestIssuesStatistics(data)
      .subscribe(
        (response: any) => {
          response.statistics.forEach(statistics => {
            this.barChartLabels.push(statistics.modified_at);
            this.barChartData[0].data.push(statistics.reported_problems);
            this.barChartData[1].data.push(statistics.confirmed_problems);
            this.barChartData[2].data.push(statistics.declined_problems);
          });
        }
      );
  }

}
