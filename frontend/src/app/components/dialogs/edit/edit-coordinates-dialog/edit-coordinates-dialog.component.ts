import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-coordinates-dialog',
  templateUrl: './edit-coordinates-dialog.component.html',
  styleUrls: ['./edit-coordinates-dialog.component.css']
})
export class EditCoordinatesDialogComponent implements OnInit {

  public formControlGroup: FormGroup = this.formBuilder.group({
    latitude: ['', Validators.required],
    longitude: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<EditCoordinatesDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  get fieldNameGroup() {
    return this.formControlGroup;
  }

  get fieldNameControl() {
    return this.formControlGroup.controls;
  }

  get latitudeControlError() {
    return this.fieldNameControl.latitude.errors;
  }

  get longitudeControlError() {
    return this.fieldNameControl.longitude.errors;
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public onSubmit() {
    if (this.fieldNameGroup.invalid) {
      return;
    }

    const dataObject = {
      event: 'Submit',
      latitude: this.fieldNameControl.latitude.value,
      longitude: this.fieldNameControl.longitude.value
    }
    
    this.dialogRef.close(dataObject);
  }
}
