import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserPanelService } from '../../../services/user-panel.service';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-action-button-dialog',
  templateUrl: './action-button-dialog.component.html',
  styleUrls: ['./action-button-dialog.component.css']
})
export class ActionButtonDialogComponent implements OnInit {

  public localData: any;

  constructor(public dialogRef: MatDialogRef<ActionButtonDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private userPanelService: UserPanelService,
    private userProfileService: UserProfileService) {
    this.localData = { ...data };
  }

  ngOnInit() {
  }

  public checkUserType() {
    if (this.localData.user_type === 'user') {
      this.localData.forest_name = null;
      return false;
    } else if (!this.localData.forest_name) {
      this.localData.forest_name = this.data.forest_name;
    }
    return true;
  }

  public doAction(action) {
    this.dialogRef.close({ event: action, data: this.localData });
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
