import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ForestLocationDialogComponent } from '../../display/forest-location-dialog/forest-location-dialog.component';

@Component({
  selector: 'app-edit-forest-dialog',
  templateUrl: './edit-forest-dialog.component.html',
  styleUrls: ['./edit-forest-dialog.component.css']
})
export class EditForestDialogComponent implements OnInit {

  public localData: any;

  constructor(public dialogRef: MatDialogRef<ForestLocationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.localData = { ...data };
  }

  ngOnInit() { }

  public doAction(action) {
    this.dialogRef.close({ event: action, data: this.data });
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
