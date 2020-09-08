import { Component, OnInit } from '@angular/core';
import { DatabaseRequestService } from 'src/app/services/database-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pageTitle: string;
  public userType: string;

  constructor(private databaseRequestService: DatabaseRequestService) {
    this.getUserCredentials();
  }

  ngOnInit() {
  }

  public getUserCredentials() {
    this.databaseRequestService.requestUserCredentials()
      .subscribe(
        (response: any) => {
          this.pageTitle = 'Welcome ' + response.name;
          this.userType = response.user_type;
        },
      );
  }
}
