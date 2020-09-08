import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-edit-forest-name',
  templateUrl: './edit-forest-name.component.html',
  styleUrls: ['./edit-forest-name.component.css']
})
export class EditForestNameComponent implements OnInit {

  public isEditForestNameInputDisabled = true;
  public dataSource;

  public forestNameForm: FormGroup = this.formBuilder.group({
    forestName: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.currentAssigmentForestDataSource.subscribe(dataSource => this.dataSource = dataSource);
  }

  get forestNameControl() {
    return this.forestNameForm.controls;
  }

  get forestNameControlErrors() {
    return this.forestNameControl.forestName.errors;
  }

  public onSubmitForestName() {
    if (this.forestNameForm.invalid) {
      return;
    }

    this.editForestName();
    this.isEditForestNameInputDisabled = true;
  }

  public editForestName() {
    const oldForestName = this.dataSource.forest.forest_name;
    this.dataSource.forest.forest_name = this.forestNameControl.forestName.value;
    this.userPanelService.changeAssigmentForestDataSource(this.dataSource);
    this.alertService.success('Forest name ' + oldForestName + ' was changed in ' + this.dataSource.forest.forest_name + ' with success!', true);
  }
}
