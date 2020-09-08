import { Injectable } from '@angular/core';
import { DatabaseRequestService } from './database-request.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  public selectedTab: string;

  public userTabs = [
    {
      tabName: 'Dashboard',
      toolTip: 'User Panel Homepage',
      icon: 'dashboard'
    },
    {
      tabName: 'New Event',
      toolTip: 'Create Issue',
      icon: 'add'
    },
    {
      tabName: 'History',
      toolTip: 'See your issues reports history',
      icon: 'history'
    }
  ];

  public foresterTabs = [
    {
      tabName: 'Forest',
      toolTip: 'See and Edit Forest Details',
      icon: 'nature'
    },
    {
      tabName: 'Validate',
      toolTip: 'Validation Issues',
      icon: 'report_problem'
    },
    {
      tabName: 'Statistics',
      toolTip: 'Forest Statistics',
      icon: 'bar_chart'
    },
  ];

  public administratorTabs = [
    {
      tabName: 'Users',
      toolTip: 'Administrate all users',
      icon: 'group'
    },
    {
      tabName: 'Forests',
      toolTip: 'Administrate all forests',
      icon: 'nature'
    },
    {
      tabName: 'Events',
      toolTip: 'Administrate all issues',
      icon: 'event'
    },
    {
      tabName: 'Requests',
      toolTip: 'Administrate forester access requests',
      icon: 'assignment_ind'
    }
  ];

  public assigmentForestDataSource = new BehaviorSubject<any>(null);
  public currentAssigmentForestDataSource = this.assigmentForestDataSource.asObservable();

  public dataFormatSource = new BehaviorSubject<any>(null);
  public currentDates = this.dataFormatSource.asObservable();

  public usersType;
  public userTypeAccess;
  public userID;
  public forestID;

  constructor(private databaseRequestService: DatabaseRequestService) {
    this.initData();
  }

  public resetUserPanelVariables() {
    this.usersType = null;
    this.userTypeAccess = null;
    this.userID = null;
    this.forestID = null;
  }

  public initData() {
    this.getUsersType();
    this.getUserCredentials();
  }

  // called when something changed on data source
  public changeAssigmentForestDataSource(dataSource: any) {
    this.assigmentForestDataSource.next(dataSource);
  }

  public changeData(newDates: any) {
    this.dataFormatSource.next(newDates);
  }

  public onSelectTab(tab: string) {
    this.selectedTab = tab;
  }

  public getUserCredentials() {
    this.databaseRequestService.requestUserCredentials()
      .subscribe(
        (response: any) => {
          this.userTypeAccess = response.user_type;
          this.userID = response.id;
          this.forestID = response.forest_id;
          this.getForestDataWithID(this.forestID);
        },
      );
  }

  public getForestDataWithID(forestID) {
    this.databaseRequestService.requestForestWithID(forestID)
      .subscribe(
        (response: any) => {
          this.assigmentForestDataSource.next(response);
        }
      );
  }

  public getUsersType() {
    this.databaseRequestService.requestUsersType()
      .subscribe(
        (response: any) => {
          this.usersType = response.usersType;
        }
      );
  }
}
