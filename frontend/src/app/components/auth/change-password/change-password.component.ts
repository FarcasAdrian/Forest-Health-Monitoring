import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseRequestService } from '../../../services/database-request.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public submitted = false;
  public changePasswordForm: FormGroup;
  public hideCurrentPassword = true;
  public hideNewPassword = true;
  public hideConfirmPassword = true;

  constructor(private formBuilder: FormBuilder,
    private databaseRequestService: DatabaseRequestService,
    private alertService: AlertService,
    private router: Router) {
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  get formControl() {
    return this.changePasswordForm.controls;
  }

  public toggleCurrentPasswordBtn() {
    return this.hideCurrentPassword = !this.hideCurrentPassword;
  }

  public toggleNewPasswordBtn() {
    return this.hideNewPassword = !this.hideNewPassword;
  }

  public toggleConfirmPasswordBtn() {
    return this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  public submit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.databaseRequestService.changeUserPassword(this.changePasswordForm.value)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message, true);
          this.router.navigate(['/user-profile']);
        },
        error => {
          const messages = this.alertService.objectToArray(error.error.errors);
          this.alertService.error(messages);
        }
      );
  }

}
