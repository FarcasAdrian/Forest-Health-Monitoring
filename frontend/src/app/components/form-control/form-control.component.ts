import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  public submitted = false;
  public formErrors;
  public errorMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

  set formControlErrors(errors) {
    this.formErrors = errors;
  }

  get formControlErrors() {
    return this.formErrors;
  }

  set customErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }

  get customErrorMessage() {
    return !this.errorMessage ? 'This field is required.' : this.errorMessage;
  }

}
