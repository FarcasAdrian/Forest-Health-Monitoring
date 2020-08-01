import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
