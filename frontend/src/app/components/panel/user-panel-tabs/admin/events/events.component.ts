import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { serverAPI } from 'src/app/environments/enviroments';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { NewIssueDialogComponent } from 'src/app/components/dialogs/create/new-issue-dialog/new-issue-dialog.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['forest', 'email', 'problemType', 'description', 'photo', 'validated', 'action'];
  dataSource: any = [];

  constructor(private databaseRequestService: DatabaseRequestService,
    private dialog: MatDialog,
    private alserService: AlertService,
    public dialogsService: DialogsService) {
    this.getIssuesForAllForests();
  }

  ngOnInit() { }

  public getIssuesForAllForests() {
    this.databaseRequestService.requestAllIssues()
      .subscribe(
        (response: any) => {
          const issuesList = [];

          for (let index in response.issues) {
            if (response.issues[index].photo) {
              response.issues[index].photo = serverAPI + response.issues[index].photo;
            }
            issuesList.push(response.issues[index]);
          }

          this.dataSource = new MatTableDataSource(issuesList);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  public onSubmitValidation(validationType, id) {
    this.databaseRequestService.updateIssueValidation(validationType, id)
      .subscribe(
        (response: any) => {
          this.alserService.success(response.message);
          this.getIssuesForAllForests();
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

  public openNewIssueDialog() {
    let dialogRef = this.dialog.open(NewIssueDialogComponent, {
      width: 'auto',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(
      data => this.getIssuesForAllForests()
    );
  }
}
