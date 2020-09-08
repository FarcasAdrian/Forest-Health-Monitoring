import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { UserPanelService } from '../../../services/user-panel.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    public userPanelService: UserPanelService) {
  }

  ngOnInit() {
    if (!this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['']);
    }

    this.userPanelService.selectedTab = 'Dashboard';
  }

}
