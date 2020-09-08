import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css']
})
export class NavContentComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private userProfileService: UserProfileService) {
  }

  ngOnInit() {
  }

}
