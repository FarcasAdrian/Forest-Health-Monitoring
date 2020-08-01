import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomepageComponent } from "./components/homepage/homepage.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
