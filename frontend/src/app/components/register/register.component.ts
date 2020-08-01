import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('register-bg');
  }

  ngOnDestroy() {
    document.body.classList.remove('register-bg');
  }

}
