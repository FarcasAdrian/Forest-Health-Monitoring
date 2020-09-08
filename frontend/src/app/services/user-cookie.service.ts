import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {DatabaseRequestService} from './database-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserCookieService {

  public tokenExpiryDate: any;
  public userCredentials = {
    accessToken: '',
    expiryIn: 0,
    tokenType: ''
  };

  constructor(private cookieService: CookieService,
              private databaseRequestService: DatabaseRequestService) {
  }

  public setUserCredentials(user) {
    this.userCredentials = {
      accessToken: user.access_token,
      expiryIn: user.expires_in,
      tokenType: user.token_type
    };
  }

  public setCookieExpireTime() {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + this.userCredentials.expiryIn);
    this.tokenExpiryDate = currentDate;
  }

  public setUserCookies() {
    this.cookieService.set('auth', this.userCredentials.accessToken, this.userCredentials.expiryIn);
    this.cookieService.set('expiryDate', this.tokenExpiryDate, this.userCredentials.expiryIn);
  }

  public getUserCookies() {
    return {
      userAuth: this.cookieService.get('auth'),
      expiryDate: this.cookieService.get('expiryDate'),
    };
  }

  public removeUserCookies() {
    this.cookieService.delete('auth');
    this.cookieService.delete('expiryDate');
  }

  public getCookieValidationTimeLeft() {
    return ((this.tokenExpiryDate.getTime() - new Date().getTime()) / 1000) / 60;
  }

  /**
   * @return 'valid' if are still more than 10 minutes left before cookie to expire
   * @return 'invalid' if cookies will expire in 1 minute or are already expired
   */
  public isCookieValid() {
    this.tokenExpiryDate = new Date(this.getUserCookies().expiryDate);
    if (this.tokenExpiryDate && this.getCookieValidationTimeLeft() > 10) {
      return 'valid';
    } else if (this.tokenExpiryDate && this.getCookieValidationTimeLeft() < 1) {
      return 'invalid';
    }
  }

  public updateUserCookies() {
    this.databaseRequestService.refreshUserToken()
      .subscribe(
        (user: any) => {
          this.setUserCredentials(user);
          this.setCookieExpireTime();
          this.removeUserCookies();
          this.setUserCookies();
        });
  }
}
