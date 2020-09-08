import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-field-dialog',
  templateUrl: './remove-field-dialog.component.html',
  styleUrls: ['./remove-field-dialog.component.css']
})
export class RemoveFieldDialogComponent implements OnInit {

  public localData: any;

  constructor(private dialogRef: MatDialogRef<RemoveFieldDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.localData = { ...data };
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.dialogRef.close({ event: 'Submit' });
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
