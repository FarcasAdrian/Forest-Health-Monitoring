import { Component, OnInit } from '@angular/core';
import { UserPanelService } from 'src/app/services/user-panel.service';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { serverAPI } from 'src/app/environments/enviroments';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-validate-events',
  templateUrl: './validate-events.component.html',
  styleUrls: ['./validate-events.component.css']
})
export class ValidateEventsComponent implements OnInit {

  public toolbarMessage = "No new issues found.";
  displayedColumns: string[] = ['email', 'problemType', 'description', 'photo', 'validated', 'action'];
  dataSource = [];

  constructor(private userPanelService: UserPanelService,
    private databaseRequestService: DatabaseRequestService,
    private alserService: AlertService,
    private dialog: MatDialog,
    public dialogsService: DialogsService) {
    this.getIssues();
  }

  ngOnInit() {
  }

  public getIssues() {
    this.databaseRequestService.requestIssuesForForestWithID(this.userPanelService.forestID)
      .subscribe(
        (response: any) => {
          const issuesList = [];

          for (let index in response.issues) {
            if (response.issues[index].photo) {
              response.issues[index].photo = serverAPI + response.issues[index].photo;
            }
            issuesList.push(response.issues[index]);
          }
          
          this.dataSource = issuesList;
        }
      );
  }

  public openConfirmActionDialog(validationType, id) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '270px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmitValidation(validationType, id);
      }
    });
  }

  public onSubmitValidation(validationType, id) {
    this.databaseRequestService.updateIssueValidation(validationType, id)
      .subscribe(
        (response: any) => {
          this.alserService.success(response.message);
          this.getIssues();
        }
      );
  }
}
