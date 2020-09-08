import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { DatabaseRequestService } from 'src/app/services/database-request.service';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { UserProfileDialogComponent } from 'src/app/components/dialogs/user-profile-dialog/user-profile-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  public issueDescriptionControl = new FormControl('', Validators.required);
  public forestControl = new FormControl('', Validators.required);
  public forests;

  public forestProblemControl = new FormControl('', Validators.required);
  public forestProblems;

  matcher = new MyErrorStateMatcher();
  private forestIssueImageName = '';

  constructor(private databaseRequestService: DatabaseRequestService,
    private matDialog: MatDialog,
    private alertService: AlertService,
    private userPanelService: UserPanelService) {
    this.databaseRequestService.requestForestNameList()
      .subscribe(
        (response: any) => {
          this.forests = response;
        }
      )

    this.databaseRequestService.requestForestProblems()
      .subscribe(
        (response: any) => {
          this.forestProblems = response.forestProblems;
        }
      )
  }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.forestControl.invalid || this.issueDescriptionControl.invalid || this.forestProblemControl.invalid) {
      this.alertService.error(['All required fields must be filled!'], true);
      return;
    }

    const forestProblemID = this.forestProblems.find(element => element.problem_type === this.forestProblemControl.value).id;
    const data = {
      userID: this.userPanelService.userID,
      forestID: this.forests.indexOf(this.forestControl.value) + 1,
      forestProblemID: forestProblemID,
      description: this.issueDescriptionControl.value,
      photo: this.forestIssueImageName,
      validated: false
    }

    this.databaseRequestService.createNewForestIssue(data)
      .subscribe(
        (response: any) => {
          this.alertService.success(response.message);
        }
      );
  }

  public uploadImage(event) {
    const selectedFile: File = event.target.files[0];
    const fd: FormData = new FormData();
    fd.append('image', selectedFile, selectedFile.name);

    this.databaseRequestService.requestUploadForestIssueImage(fd)
      .subscribe(
        (response: any) => {
          this.forestIssueImageName = response.imageName;
        }, error => {
          this.uploadImageErrorDialog(error.error.errors.image[0]);
        });
  }

  public uploadImageErrorDialog(errMessage) {
    this.matDialog.open(UserProfileDialogComponent, {
      data: {
        title: 'Error',
        name: 'image',
        errorMessage: errMessage
      },
      disableClose: true
    });
  }
}
