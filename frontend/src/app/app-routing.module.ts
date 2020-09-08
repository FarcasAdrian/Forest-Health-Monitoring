import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPanelComponent } from './components/panel/user-panel/user-panel.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'user-panel', component: UserPanelComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
