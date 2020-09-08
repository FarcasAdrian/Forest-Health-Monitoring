import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['']);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.email])
    });

    document.body.classList.add('register-bg');
  }

  ngOnDestroy() {
    document.body.classList.remove('register-bg');
  }

  get formControl() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(this.registerForm.value);
  }
}
