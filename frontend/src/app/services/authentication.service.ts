import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseRequestService} from './database-request.service';
import {UserCookieService} from './user-cookie.service';
import {UserProfileService} from './user-profile.service';
import {first} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isUserLoggedIn = false;

  constructor(private router: Router,
              private databaseRequestService: DatabaseRequestService,
              private userCookieService: UserCookieService,
              private userProfileService: UserProfileService,
              private alertService: AlertService) {
    this.initUserLogIn();
  }

  public logout() {
    this.isUserLoggedIn = false;
    this.databaseRequestService.userLogout()
      .subscribe(user => {
        this.userCookieService.removeUserCookies();
        this.router.navigate(['']);
      });
  }

  /**
   * if are more than 10 minutes left, cookies are still valid => no need modification
   * if is between 1 and 10 minutes left, cookies are still valid but better to update them
   * if cookies will expire in 1 minute or already expired, the user will be logged out
   */
  public initUserLogIn() {
    if (this.userCookieService.getUserCookies().userAuth) {
      if (this.userCookieService.isCookieValid() === 'valid') {
        this.isUserLoggedIn = true;
        this.userProfileService.setUserCredentials();
      } else if (this.userCookieService.isCookieValid() === 'invalid') {
        this.isUserLoggedIn = false;
        this.userCookieService.removeUserCookies();
        this.router.navigate(['']);
      } else {
        this.userCookieService.updateUserCookies();
        this.userProfileService.setUserCredentials();
      }
    }
  }

  public register(userCredentials) {
    this.databaseRequestService.registerUser(JSON.stringify(userCredentials))
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success('You have successfully registered!', true);
          this.router.navigate(['/login']);
        },
        error => {
          const messages = this.alertService.objectToArray(JSON.parse(error.error));
          this.alertService.error(messages);
        });
  }
}
