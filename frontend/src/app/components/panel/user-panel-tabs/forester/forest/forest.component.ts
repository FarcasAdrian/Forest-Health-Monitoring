import { Component, OnInit } from '@angular/core';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit {

  public dataSource;
  public title: string;

  constructor(private databaseRequestService: DatabaseRequestService,
    private alertService: AlertService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.assigmentForestDataSource.subscribe(dataSource => {
      this.dataSource = dataSource;
      this.title = 'Manage ' + this.dataSource.forest.forest_name;
    });
  }

  public submitForest() {
    const dataObject = {
      id: this.dataSource.forest.id,
      forest_name: this.dataSource.forest.forest_name,
      location: this.dataSource.forest.location,
      surface: this.dataSource.forest.surface,
      tree_type: this.dataSource.treeTypes
    };

    this.databaseRequestService.requestEditForest(dataObject)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message);
        }
      );
  }
}

