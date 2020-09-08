import { Component, OnInit } from '@angular/core';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { UserPanelService } from 'src/app/services/user-panel.service';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-issues-history',
  templateUrl: './issues-history.component.html',
  styleUrls: ['./issues-history.component.css']
})
export class IssuesHistoryComponent implements OnInit {

  public toolbarMessage = "Your history is empty.";
  public dataSource = [];
  public displayedColumns: string[] = ['forest_name', 'name', 'problemType', 'description', 'action', 'at_date'];

  constructor(public databaseRequestService: DatabaseRequestService,
    public userPanelService: UserPanelService,
    public dialogsService: DialogsService) {
    this.databaseRequestService.requestIssuesHistory(this.userPanelService.userID)
    .subscribe(
      (response: any) => {
        this.dataSource = response.issues_historic;
      }
    );
  }

  ngOnInit() {
  }

}
