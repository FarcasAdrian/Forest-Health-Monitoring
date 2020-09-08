import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { RemoveFieldDialogComponent } from '../../dialogs/remove/remove-field-dialog/remove-field-dialog.component';
import { NewTreeTypeDialogComponent } from '../../dialogs/create/new-tree-type-dialog/new-tree-type-dialog.component';
import { UserPanelService } from 'src/app/services/user-panel.service';
import { EditTreeTypeDialogComponent } from '../../dialogs/edit/edit-tree-type-dialog/edit-tree-type-dialog.component';

@Component({
  selector: 'app-tree-types-table',
  templateUrl: './tree-types-table.component.html',
  styleUrls: ['./tree-types-table.component.css']
})
export class TreeTypesTableComponent implements OnInit {

  public toolbarMessage = "This forest doesn't have tree types saved in database.";
  public dataSource: any = [];

  constructor(private alertService: AlertService,
    private dialog: MatDialog,
    private userPanelService: UserPanelService) {
  }

  ngOnInit() {
    this.userPanelService.assigmentForestDataSource.subscribe(tableSource => this.dataSource = tableSource);
  }

  public openEditFieldDialog(treeType: string, objectID: number, fieldTitle: string) {
    const dialogRef = this.dialog.open(EditTreeTypeDialogComponent, {
      width: '250px',
      data: {
        treeType: treeType,
        objectID: objectID,
        fieldTitle: fieldTitle
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Submit') {
        this.editTreeType(result.modifiedTreeTypeName, treeType);
      }
    })
  }

  public openRemoveFieldDialog(content: string) {
    const dialogRef = this.dialog.open(RemoveFieldDialogComponent, {
      width: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Submit') {
        this.removeTreeType(content);
      }
    });
  }

  public openNewTreeTypeDialog(objectID) {
    const dialogref = this.dialog.open(NewTreeTypeDialogComponent, {
      width: '340px',
      data: objectID,
      disableClose: true,
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.event === 'Submit') {
        this.newTreeType(result.treeTypes);
      }
    })
  }

  public newTreeType(treeTypes: string[]) {
    const treeTypeList = this.dataSource.treeTypes;
    this.dataSource.treeTypes = [];

    treeTypeList.forEach(treeType => {
      this.dataSource.treeTypes.push({ type: treeType.type })
    });

    treeTypes.forEach(treeType => {
      this.dataSource.treeTypes.push({ type: treeType });
    });

    this.alertService.success('One more more tree types was added on list.', true);
  }

  public editTreeType(modifiedTreeTypeName: string, oldTreeTypeName: string) {
    const treeTypeObject = this.dataSource.treeTypes.find(treeType => treeType.type === oldTreeTypeName);
    const treeTypeIndex = this.dataSource.treeTypes.indexOf(treeTypeObject);
    this.dataSource.treeTypes[treeTypeIndex].type = modifiedTreeTypeName;
    this.alertService.success('Tree type ' + oldTreeTypeName + ' was changed in ' + modifiedTreeTypeName + ' with success!', true);
  }

  public removeTreeType(treeType: string) {
    this.dataSource.treeTypes = this.dataSource.treeTypes.filter(treeTypeObject => treeTypeObject.type !== treeType);
    this.alertService.success(treeType + ' was removed from list!', true);
  }

}
