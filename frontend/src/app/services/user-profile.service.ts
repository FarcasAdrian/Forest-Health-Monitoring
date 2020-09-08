import {Injectable} from '@angular/core';
import {serverAPI} from '../environments/enviroments';
import {DatabaseRequestService} from './database-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  public userProfileData = {
    name: '',
    email: '',
    profileImagePath: '',
    assigmentForest: '',
    userType: ''
  };

  public forestNameList = [];

  constructor(private databaseRequestService: DatabaseRequestService) {
    this.getForestNameList();
  }

  public setUserCredentials() {
    this.databaseRequestService.requestUserCredentials()
      .subscribe(
        (response: any) => {
          this.userProfileData.name = response.name;
          this.userProfileData.email = response.email;
          this.userProfileData.profileImagePath = serverAPI + response.profile_image_path;
          this.userProfileData.userType = response.user_type;
          this.userProfileData.assigmentForest = response.assigment_forest;
        },
      );
  }

  public getForestNameList() {
    this.databaseRequestService.requestForestNameList()
      .subscribe(
        (data: any) => {
          data.forEach(forestName => this.forestNameList.push(forestName));
        }
      );
  }
}
