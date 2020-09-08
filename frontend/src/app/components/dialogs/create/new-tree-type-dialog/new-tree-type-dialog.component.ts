import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-new-tree-type-dialog',
  templateUrl: './new-tree-type-dialog.component.html',
  styleUrls: ['./new-tree-type-dialog.component.css']
})
export class NewTreeTypeDialogComponent implements OnInit {

  public treeTypes = new FormControl('', Validators.required);
  public treeTypeList;

  constructor(public dialogRef: MatDialogRef<NewTreeTypeDialogComponent>,
    private databaseRequestService: DatabaseRequestService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.assigmentForestDataSource.subscribe(dataSource => this.getTreeTypes(dataSource.treeTypes));
  }

  public onSubmit() {
    if (this.treeTypes.hasError('required')) {
      return;
    }

    this.dialogRef.close({ event: 'Submit', treeTypes: this.treeTypes.value });
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public getTreeTypes(treeTypes) {
    this.databaseRequestService.requestTreeTypes()
      .subscribe(
        (response: any) => {
          this.treeTypeList = response.treeType;
          treeTypes.forEach(treeType => {
            this.treeTypeList = this.treeTypeList.filter(item => item.type !== treeType.type);
          });
        }
      );
  }
}
