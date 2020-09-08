import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-edit-tree-type-dialog',
  templateUrl: './edit-tree-type-dialog.component.html',
  styleUrls: ['./edit-tree-type-dialog.component.css']
})
export class EditTreeTypeDialogComponent implements OnInit {

  public treeTypes = new FormControl('', Validators.required);
  public treeTypeList;

  constructor(public dialogRef: MatDialogRef<EditTreeTypeDialogComponent>,
    private databaseRequestService: DatabaseRequestService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.assigmentForestDataSource.subscribe(dataSource => this.getTreeTypes(dataSource.treeTypes));
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

  public onSubmit() {
    if (this.treeTypes.invalid) {
      return;
    }

    this.dialogRef.close({ event: 'Submit', modifiedTreeTypeName: this.treeTypes.value });
  }

}
