import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  public fromDate = new FormControl(new Date());
  public untilDate = new FormControl(new Date());
  public maxDate = new Date();
  public minimDate: Date;

  constructor(private userPanelService: UserPanelService) {
    this.newFromDate = this.fromDate.value;
    this.minimDate = this.fromDate.value;
    this.changeDateFormat();
  }

  ngOnInit() {
    this.fromDate.valueChanges.subscribe(newMinimDate => {
      this.minimDate = newMinimDate;
    });
  }

  set newFromDate(newDate) {
    const currentDate = newDate;
    currentDate.setDate(currentDate.getDate() - 30);
    this.fromDate.setValue(currentDate);
  }

  get startDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    return currentDate;
  }

  get endDate() {
    return new Date();
  }

  public changeDateFormat() {
    const dataFormat = {
      fromDate: new DatePipe('en').transform(this.fromDate.value, 'yyyy-MM-dd'),
      untilDate: new DatePipe('en').transform(this.untilDate.value, 'yyyy-MM-dd')
    }
    this.userPanelService.changeData(dataFormat);
  }

  public onSubmitFilter() {
    if (this.fromDate.invalid || !this.fromDate.value || this.untilDate.invalid || !this.untilDate.value) {
      return;
    }
    this.changeDateFormat();
  }

}
