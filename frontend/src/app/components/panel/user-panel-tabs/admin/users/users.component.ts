import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionButtonDialogComponent } from '../../../../dialogs/action-button-dialog/action-button-dialog.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns = ['id', 'name', 'email', 'userType', 'assigmentForest', 'action'];
  public dataSource;

  constructor(private databaseRequestService: DatabaseRequestService,
    private dialog: MatDialog,
    private alertService: AlertService) {
    this.getAllUsers();
  }

  ngOnInit() {
  }

  public getAllUsers() {
    this.databaseRequestService.requestAllUsers()
      .subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource(response.users);
          this.dataSource.paginator = this.paginator;
        }
      );
  }

  public openDialog(action, obj) {
    obj.action = action;
    let dialogSize = '250px';

    if (action === 'edit') {
      dialogSize = '500px';
    }

    const dialogRef = this.dialog.open(ActionButtonDialogComponent, {
      width: dialogSize,
      data: obj,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'delete') {
        this.deleteUser(result.data.id);
      } else if (result.event === 'edit') {
        this.editUser(result.data);
      }
    });
  }

  public deleteUser(userID) {
    this.databaseRequestService.deleteUser(userID)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message, true);
          this.getAllUsers();
        }
      );
  }

  public editUser(userObject) {
    this.databaseRequestService.editUser(userObject, userObject.id)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message, true);
          this.getAllUsers();
        }
      );
  }
}
