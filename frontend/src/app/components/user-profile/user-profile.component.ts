import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { DatabaseRequestService } from '../../services/database-request.service';
import { UserProfileService } from '../../services/user-profile.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { serverAPI } from 'src/app/environments/enviroments';
import { UserProfileDialogComponent } from '../dialogs/user-profile-dialog/user-profile-dialog.component';
import { MatDialog } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public requestAccessSent = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private databaseRequestService: DatabaseRequestService,
    private userProfileService: UserProfileService,
    private dialogsService: DialogsService,
    private dialog: MatDialog,
    private alertService: AlertService) {
    this.checkRequestAccess();
  }

  private selectedFile: File;

  ngOnInit() {
    if (!this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['']);
    }
  }

  public onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  public onUpload() {
    if (!this.selectedFile) {
      this.dialogsService.uploadImageErrorDialog('You must to choose a image.');
      return;
    }

    const fd: FormData = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.updateProfilePicture(fd);
  }

  public updateProfilePicture(fd: FormData) {
    this.databaseRequestService.updateUserProfileImage(fd)
      .subscribe(
        (response: any) => {
          this.userProfileService.userProfileData.profileImagePath = serverAPI + response.path;
        }, error => {
          this.dialogsService.uploadImageErrorDialog(error.error.errors.image[0]);
        });
  }

  public checkRequestAccess() {
    this.databaseRequestService.checkIfRequesForestAccessWasSent()
      .subscribe(
        (response: any) => {
          if (response.message === 'Request found.') {
            this.requestAccessSent = true;
          }
        }
      )
  }

  public changeForestAssigmentDialog() {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      data: {
        labelName: 'Forest Assigment',
        formControlName: 'forestAssigment',
        title: 'Request Forest Assigment',
        displayValue: this.userProfileService.userProfileData.assigmentForest
      },
      disableClose: true,
      width: '30em',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Submit') {
        this.checkRequestAccess();
        this.alertService.success(result.message);
      }
    });
  }
}
