import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-coordinates-dialog',
  templateUrl: './new-coordinates-dialog.component.html',
  styleUrls: ['./new-coordinates-dialog.component.css']
})
export class NewCoordinatesDialogComponent implements OnInit {

  public formControlGroup: FormGroup = this.formBuilder.group({
    latitudeField: ['', Validators.required],
    longitudeField: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<NewCoordinatesDialogComponent>,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  get fieldNameGroup() {
    return this.formControlGroup;
  }

  get fieldNameControl() {
    return this.formControlGroup.controls;
  }

  get latitudeControlError() {
    return this.fieldNameControl.latitudeField.errors;
  }

  get longitudeControlError() {
    return this.fieldNameControl.longitudeField.errors;
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
      coordinates: [
        parseFloat(this.fieldNameControl.latitudeField.value),
        parseFloat(this.fieldNameControl.longitudeField.value)
      ],
    }

    this.dialogRef.close(dataObject);
  }
}
