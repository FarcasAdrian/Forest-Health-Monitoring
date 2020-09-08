import { Injectable } from '@angular/core';
import { ShowImageDialogComponent } from '../components/dialogs/display/show-image-dialog/show-image-dialog.component';
import { ShowLongTextDialogComponent } from '../components/dialogs/display/show-long-text-dialog/show-long-text-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../components/dialogs/user-profile-dialog/user-profile-dialog.component';
import { UserProfileService } from './user-profile.service';
import { ForestLocationDialogComponent } from '../components/dialogs/display/forest-location-dialog/forest-location-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog,
    private userProfileService: UserProfileService) { }

  public openShowImageDialog(imageLink) {
    let dialogRef = this.dialog.open(ShowImageDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        link: imageLink
      }
    });
  }

  public openShowTextDialog(text) {
    let dialogRef = this.dialog.open(ShowLongTextDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        text: text
      }
    });
  }

  public changeNameDialog() {
    this.dialog.open(UserProfileDialogComponent, {
      data: {
        title: 'Change Name',
        labelName: 'Name',
        formControlName: 'name',
        displayValue: this.userProfileService.userProfileData.name,
        errorMessage: 'This field can\'t be empty.'
      },
      disableClose: true,
      width: '23em',
    });
  }

  public changeEmailDialog() {
    this.dialog.open(UserProfileDialogComponent, {
      data: {
        labelName: 'Email',
        formControlName: 'email',
        title: 'Change Email Address',
        displayValue: this.userProfileService.userProfileData.email,
        errorMessage: 'This field can\'t be empty.'
      },
      disableClose: true,
      width: '25em',
    });
  }

  public uploadImageErrorDialog(errMessage) {
    this.dialog.open(UserProfileDialogComponent, {
      data: {
        title: 'Error',
        name: 'image',
        errorMessage: errMessage
      },
      disableClose: true
    });
  }

  public openGoogleMapDialog(mapData: object) {
    const dialogRef = this.dialog.open(ForestLocationDialogComponent, {
      width: '60%',
      height: '60%',
      data: mapData,
    });
  }
}
