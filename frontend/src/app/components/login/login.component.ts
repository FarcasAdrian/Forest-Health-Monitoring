import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('login-bg');
  }

  ngOnDestroy() {
    // remove class before leave the login page
    document.body.classList.remove('login-bg');
  }

}
