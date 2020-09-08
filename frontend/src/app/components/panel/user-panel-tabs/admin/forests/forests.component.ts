import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditForestDialogComponent } from '../../../../dialogs/edit/edit-forest-dialog/edit-forest-dialog.component';
import { MatTableDataSource } from '@angular/material';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserPanelService } from 'src/app/services/user-panel.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ListDialogComponent } from 'src/app/components/dialogs/display/list-dialog/list-dialog.component';

@Component({
  selector: 'app-forests',
  templateUrl: './forests.component.html',
  styleUrls: ['./forests.component.css']
})
export class ForestsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = ['id', 'forest_name', 'tree_type', 'location', 'surface', 'unit', 'action'];
  dataSource;

  constructor(private databaseRequestService: DatabaseRequestService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private userPanelService: UserPanelService,
    private dialogsService: DialogsService) {
    this.getAllForests();
  }

  ngOnInit() { }

  public getAllForests() {
    this.databaseRequestService.requestForests()
      .subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource(response.forests);
          this.dataSource.paginator = this.paginator;
        }
      );
  }

  setForestDataSource(action, forestID) {
    this.userPanelService.getForestDataWithID(forestID);
    this.openDialog(action, forestID);
  }

  public openDialog(action, forestID) {
    let width = '70%';
    let height = '80%';
    if (action === 'delete') {
      width = '250px';
      height = '150px';
    }

    const dialogRef = this.dialog.open(EditForestDialogComponent, {
      width: width,
      height: height,
      data: {
        action: action
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'delete') {
        this.deleteForest(forestID);
      }

      this.userPanelService.getUserCredentials();
    });
  }

  public deleteForest(forestID) {
    this.databaseRequestService.requestDeleteForest(forestID)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message, true);
          this.getAllForests();
        }
      );
  }

  public openTreeTypeListDialog(treeTypeList: []) {
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: '18%',
      data: treeTypeList
    });
  }
}
