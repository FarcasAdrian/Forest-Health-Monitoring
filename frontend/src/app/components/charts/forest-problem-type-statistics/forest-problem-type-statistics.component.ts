import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-forest-problem-type-statistics',
  templateUrl: './forest-problem-type-statistics.component.html',
  styleUrls: ['./forest-problem-type-statistics.component.css']
})
export class ForestProblemTypeStatisticsComponent implements OnInit {

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
      this.getStatistics(dataSource);
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
      { backgroundColor: '#00E68A' },
      { backgroundColor: '#5BEAFF' },
      { backgroundColor: '#E328FF' },
      { backgroundColor: '#FF0000' },
      { backgroundColor: '#F2BD2B' },
      { backgroundColor: '#818181' }
    ];

    this.barChartData = [
      { label: 'deforestation', data: [] },
      { label: 'forest degradation', data: [] },
      { label: 'storm', data: [] },
      { label: 'getting older', data: [] },
      { label: 'other', data: [] }
    ];
  }

  // Documentation: https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/

  public getStatistics(data: object) {
    data['forestID'] = this.userPanelService.forestID;
    this.databaseRequestService.requestforestTreeTypeProblemStatistics(data)
      .subscribe(
        (response: any) => {
          let statistics_list = Object.values(response.statistics);

          statistics_list.forEach(statistics => {
            const total_items = statistics['deforestation'] + statistics['forest_degradation'] + statistics['storm'] + statistics['getting_older'] + statistics['other'];

            if (total_items > 0) {
              this.barChartLabels.push(statistics['at_date']);
              this.barChartData[0].data.push(statistics['deforestation']);
              this.barChartData[1].data.push(statistics['forest_degradation']);
              this.barChartData[2].data.push(statistics['storm']);
              this.barChartData[3].data.push(statistics['getting_older']);
              this.barChartData[4].data.push(statistics['other']);
            }
          });
        }
      );
  }

}
