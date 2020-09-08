import { Component, OnInit } from '@angular/core';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-forester-request',
  templateUrl: './forester-request.component.html',
  styleUrls: ['./forester-request.component.css']
})
export class ForesterRequestComponent implements OnInit {

  public toolbarMessage = "No new requests.";
  dataSource = [];
  public displayedColumns: string[] = ['request_id', 'user_name', 'email', 'forest_name', 'action'];

  constructor(public databaseRequestService: DatabaseRequestService,
    public dialog: MatDialog,
    public alertService: AlertService) {
    this.getUsersAccessRequests();
  }

  ngOnInit() {
  }

  public getUsersAccessRequests() {
    this.databaseRequestService.getAllAccessRequests()
      .subscribe(
        (response: any) => {
          this.dataSource = response.requests;
        }
      )
  }

  public declineRequest(request_id) {
    this.databaseRequestService.declineAccessRequest(request_id)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message);
          this.getUsersAccessRequests();
        }
      )
  }

  public confirmRequest(request_id) {
    this.databaseRequestService.confirmAccessRequest(request_id)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message);
          this.getUsersAccessRequests();
        }
      )
  }

  public openConfirmActionDialog(validationType, request_id) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '270px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        validationType === 'Declined' ? this.declineRequest(request_id) : this.confirmRequest(request_id);
      }
    });
  }

}
