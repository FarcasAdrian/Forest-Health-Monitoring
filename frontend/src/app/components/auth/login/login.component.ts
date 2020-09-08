import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseRequestService } from '../../../services/database-request.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { first } from 'rxjs/operators';
import { UserCookieService } from '../../../services/user-cookie.service';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;

  constructor(private databaseRequestService: DatabaseRequestService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private userCookieService: UserCookieService,
    private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // set background image
    document.body.classList.add('login-bg');
  }

  ngOnDestroy() {
    // remove class before leave the login page
    document.body.classList.remove('login-bg');
  }

  get formControl() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userLogin(this.formControl.email.value, this.formControl.password.value);
  }

  public userLogin(email, password) {
    const userCredentials = { email, password };
    this.databaseRequestService.requestUserLogin(userCredentials)
      .pipe(first())
      .subscribe(
        (user: any) => {
          this.userCookieService.setUserCredentials(user);
          this.userCookieService.setCookieExpireTime();
          this.userCookieService.setUserCookies();
          this.userProfileService.setUserCredentials();
          this.authenticationService.isUserLoggedIn = true;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(['Email or password incorrect.']);
          this.loading = false;
        }
      );
  }

}
