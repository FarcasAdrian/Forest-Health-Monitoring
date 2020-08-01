import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { MainNavbarContentComponent } from './components/main-navbar-content/main-navbar-content.component';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainNavbarComponent,
    MainNavbarContentComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AngularMaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
