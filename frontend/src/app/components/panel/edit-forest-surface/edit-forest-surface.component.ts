import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-edit-forest-surface',
  templateUrl: './edit-forest-surface.component.html',
  styleUrls: ['./edit-forest-surface.component.css']
})
export class EditForestSurfaceComponent implements OnInit {

  public isEditForestSurfaceInputDisabled = true;
  public dataSource;

  public forestSurfaceForm: FormGroup = this.formBuilder.group({
    forestSurface: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.userPanelService.currentAssigmentForestDataSource.subscribe(dataSource => this.dataSource = dataSource);
  }

  get forestSurfaceControl() {
    return this.forestSurfaceForm.controls;
  }

  get forestSurfaceFormControlErrors() {
    return this.forestSurfaceControl.forestSurface.errors;
  }

  public onSubmitForestSurface() {
    if (this.forestSurfaceForm.invalid) {
      return;
    }

    this.editForestSurface();
    this.isEditForestSurfaceInputDisabled = true;
  }

  public editForestSurface() {
    const oldSurfaceValue = this.dataSource.forest.surface;
    this.dataSource.forest.surface = parseInt(this.forestSurfaceControl.forestSurface.value);
    this.userPanelService.changeAssigmentForestDataSource(this.dataSource);
    this.alertService.success('Forest surface from ' + oldSurfaceValue + ' ha was changed in ' + this.dataSource.forest.surface + ' ha with success!', true);
  }
}
