import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { serverAPI } from '../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class DatabaseRequestService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) {
  }

  get userToken() {
    return this.cookieService.get('auth');
  }

  get header() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.userToken
    });
  }

  public requestUserLogin(userCredentials): Observable<UserLogin> {
    return this.http.post<UserLogin>(serverAPI + '/api/login', userCredentials, { headers: this.header });
  }

  public userLogout() {
    return this.http.get(serverAPI + '/api/logout', { headers: this.header });
  }

  public refreshUserToken() {
    return this.http.post(serverAPI + '/api/refresh', this.userToken, { headers: this.header });
  }

  public registerUser(userCredentials) {
    return this.http.post(serverAPI + '/api/register', userCredentials, { headers: this.header });
  }

  public requestUserCredentials() {
    return this.http.get(serverAPI + '/api/me', { headers: this.header });
  }


  // User profile functions

  public updateUserProfileImage(image) {
    return this.http.post(serverAPI + '/api/upload-profile-image', image, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userToken
      })
    });
  }

  public requestUploadForestIssueImage(image) {
    return this.http.post(serverAPI + '/api/upload-forest-issue-image', image, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userToken
      })
    });
  }

  public changeUserPassword(userPasswords) {
    return this.http.post(serverAPI + '/api/change-password', userPasswords, { headers: this.header });
  }

  public updateUserName(name) {
    return this.http.post(serverAPI + '/api/change-name', name, { headers: this.header });
  }

  public updateUserEmail(email) {
    return this.http.post(serverAPI + '/api/change-email', email, { headers: this.header });
  }


  // Users administration functions

  public requestAllUsers() {
    return this.http.get(serverAPI + '/api/users', { headers: this.header });
  }

  public createNewUser(userCredentials) {
    return this.http.post(serverAPI + '/api/users/create', userCredentials, { headers: this.header });
  }

  public editUser(userCredentials, userID) {
    return this.http.post(serverAPI + '/api/users/edit/' + userID, userCredentials, { headers: this.header });
  }

  public deleteUser(id) {
    return this.http.get(serverAPI + '/api/users/delete/' + id, { headers: this.header });
  }

  public requestUsersType() {
    return this.http.get(serverAPI + '/api/usersType', { headers: this.header });
  }


  // Forest administration functions

  public requestForestsData() {
    return this.http.get(serverAPI + '/api/forests/coordinates');
  }

  public requestForestLocation(link: string) {
    return this.http.get(link);
  }

  public sendPolygonToDB(newZoneCoordinates) {
    return this.http.post(serverAPI + '/api/satellites', JSON.stringify(newZoneCoordinates));
  }

  public requestForestNameList() {
    return this.http.get(serverAPI + '/api/forests/names');
  }

  public requestForests() {
    return this.http.get(serverAPI + '/api/forests', { headers: this.header });
  }

  public requestDeleteForest($forestID) {
    return this.http.get(serverAPI + '/api/forest/delete/' + $forestID, { headers: this.header });
  }

  public requestEditForest(forestCredentials) {
    return this.http.post(serverAPI + '/api/forest/edit/' + forestCredentials.id, forestCredentials, { headers: this.header });
  }

  public requestForestWithID(id) {
    return this.http.get(serverAPI + '/api/forest/' + id, {headers: this.header});
  }

  public requestTreeTypes() {
    return this.http.get(serverAPI + '/api/treeType', { headers: this.header });
  }


  // Forest issues functions

  public createNewForestIssue(issueData) {
    return this.http.post(serverAPI + '/api/forestEvent/create', issueData, { headers: this.header });
  }

  public requestIssuesForForestWithID(id) {
    return this.http.get(serverAPI + '/api/forestEvents/' + id, { headers: this.header });
  }

  public updateIssueValidation(validationType, id) {
    return this.http.post(serverAPI + '/api/forestEvent/edit/' + id, { validated: validationType }, { headers: this.header });
  }

  public requestAllIssues() {
    return this.http.get(serverAPI + '/api/forestEvents', { headers: this.header });
  }

  public requestIssuesHistory(id) {
    return this.http.get(serverAPI + '/api/forestEventHistory/' + id, { headers: this.header });
  }


  // Forester access request functions

  public requestForestAccess(forestName) {
    return this.http.post(serverAPI + '/api/forestAccess', forestName, { headers: this.header });
  }

  public checkIfRequesForestAccessWasSent() {
    return this.http.get(serverAPI + '/api/checkRequest', { headers: this.header });
  }

  public getAllAccessRequests() {
    return this.http.get(serverAPI + '/api/accessRequests', { headers: this.header })
  }

  public declineAccessRequest(requestID: number) {
    return this.http.get(serverAPI + '/api/declineRequest/' + requestID, { headers: this.header });
  }

  public confirmAccessRequest(requestID: number) {
    return this.http.get(serverAPI + '/api/confirmRequest/' + requestID, { headers: this.header });
  }

  public requestForestProblems() {
    return this.http.get(serverAPI + '/api/forestProblems', { headers: this.header });
  }

  
  // Statistics functions

  public requestForestIssuesStatistics(data: object) {
    return this.http.post(serverAPI + '/api/forestStatistics', data, { headers: this.header });
  }

  public requestforestTreeTypeProblemStatistics(data: object) {
    return this.http.post(serverAPI + '/api/forestTreeTypeProblemStatistics', data, { headers: this.header });
  }
  
  public requestAdminReportsStatistics(userID: number) {
    return this.http.get(serverAPI + '/api/adminReportsStatistics/' + userID, { headers: this.header });
  }

  public requestForesterIssuesStatistics(userID: number) {
    return this.http.get(serverAPI + '/api/foresterIssuesStatistics/' + userID, { headers: this.header });
  }

  public requestUserStatistics(userID: number) {
    return this.http.get(serverAPI + '/api/userStatistics/' + userID, { headers: this.header });
  }
}
