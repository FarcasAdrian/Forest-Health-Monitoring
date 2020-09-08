import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseRequestService } from '../../../services/database-request.service';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {

  public submitted = false;
  public visible = false;
  public message = '';

  public nameForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  public emailForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<UserProfileDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public databaseRequestService: DatabaseRequestService,
    public userProfileService: UserProfileService) {
  }

  ngOnInit() {
  }

  get formGroup() {
    if (this.data.formControlName === 'name') {
      return this.nameForm;
    } else if (this.data.formControlName === 'email') {
      return this.emailForm;
    }
  }

  get formControl() {
    return this.formGroup.controls;
  }

  get formControlError() {
    if (this.data.formControlName === 'name') {
      return this.formControl.name.errors;
    } else if (this.data.formControlName === 'email') {
      return this.formControl.email.errors;
    }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    if (this.data.formControlName === 'name') {
      this.changeUserName();
    } else if (this.data.formControlName === 'email') {
      this.changeUserEmail();
    }
  }

  public changeUserName() {
    this.databaseRequestService.updateUserName({ name: this.formControl.name.value })
      .subscribe(
        (response: any) => {
          this.userProfileService.setUserCredentials();
          this.visible = true;
          this.message = response.message;
        });
  }

  public changeUserEmail() {
    this.databaseRequestService.updateUserEmail({ email: this.formControl.email.value })
      .subscribe(
        (response: any) => {
          this.userProfileService.setUserCredentials();
          this.visible = true;
          this.message = response.message;
        }
      );
  }

  public requestAccess() {
    this.databaseRequestService.requestForestAccess({ forest_name: this.data.displayValue })
      .subscribe(
        (response: any) => {
          this.userProfileService.setUserCredentials();
          this.visible = true;
          this.message = response.message;
          this.dialogRef.close({ event: 'Submit', message: this.message });
        }
      )
  }
}
