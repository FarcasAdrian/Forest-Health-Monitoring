import { BrowserModule } from '@angular/platform-browser';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Routing */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Modules */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ChartsModule } from 'ng2-charts';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Components */
import { GoogleMapsComponent } from './components/map/google-maps/google-maps.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileDialogComponent } from './components/dialogs/user-profile-dialog/user-profile-dialog.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';
import { UserPanelComponent } from './components/panel/user-panel/user-panel.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MainNavComponent } from './components/nav/main-nav/main-nav.component';
import { NavContentComponent } from './components/nav/nav-content/nav-content.component';
import { DashboardComponent } from './components/panel/user-panel-tabs/user/dashboard/dashboard.component';
import { ForestComponent } from './components/panel/user-panel-tabs/forester/forest/forest.component';
import { NewEventComponent } from './components/panel/user-panel-tabs/user/new-event/new-event.component';
import { StatisticsComponent } from './components/panel/user-panel-tabs/forester/statistics/statistics.component';
import { EventsComponent } from './components/panel/user-panel-tabs/admin/events/events.component';
import { ForestsComponent } from './components/panel/user-panel-tabs/admin/forests/forests.component';
import { UsersComponent } from './components/panel/user-panel-tabs/admin/users/users.component';
import { ActionButtonDialogComponent } from './components/dialogs/action-button-dialog/action-button-dialog.component';
import { ForestLocationDialogComponent } from './components/dialogs/display/forest-location-dialog/forest-location-dialog.component';
import { GoogleMapsSearchComponent } from './components/map/google-maps-search/google-maps-search.component';
import { ListDialogComponent } from './components/dialogs/display/list-dialog/list-dialog.component';
import { EditForestDialogComponent } from './components/dialogs/edit/edit-forest-dialog/edit-forest-dialog.component';
import { RemoveFieldDialogComponent } from './components/dialogs/remove/remove-field-dialog/remove-field-dialog.component';
import { NewTreeTypeDialogComponent } from './components/dialogs/create/new-tree-type-dialog/new-tree-type-dialog.component';
import { EditCoordinatesDialogComponent } from './components/dialogs/edit/edit-coordinates-dialog/edit-coordinates-dialog.component';
import { NewCoordinatesDialogComponent } from './components/dialogs/create/new-coordinates-dialog/new-coordinates-dialog.component';
import { ValidateEventsComponent } from './components/panel/user-panel-tabs/forester/validate-events/validate-events.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ShowImageDialogComponent } from './components/dialogs/display/show-image-dialog/show-image-dialog.component';
import { ShowLongTextDialogComponent } from './components/dialogs/display/show-long-text-dialog/show-long-text-dialog.component';
import { NewIssueDialogComponent } from './components/dialogs/create/new-issue-dialog/new-issue-dialog.component';
import { IssuesHistoryComponent } from './components/panel/user-panel-tabs/user/issues-history/issues-history.component';
import { ForesterRequestComponent } from './components/panel/user-panel-tabs/admin/forester-request/forester-request.component';
import { EditForestNameComponent } from './components/panel/edit-forest-name/edit-forest-name.component';
import { EditForestSurfaceComponent } from './components/panel/edit-forest-surface/edit-forest-surface.component';
import { TreeTypesTableComponent } from './components/panel/tree-types-table/tree-types-table.component';
import { LocationTableComponent } from './components/panel/location-table/location-table.component';
import { MatToolbarMessageComponent } from './components/mat-toolbar-message/mat-toolbar-message.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PageSubtitleComponent } from './components/page-subtitle/page-subtitle.component';
import { EditTreeTypeDialogComponent } from './components/dialogs/edit/edit-tree-type-dialog/edit-tree-type-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ForestIssuesStatisticsComponent } from './components/charts/forest-issues-statistics/forest-issues-statistics.component';
import { ForestProblemTypeStatisticsComponent } from './components/charts/forest-problem-type-statistics/forest-problem-type-statistics.component';
import { UserStatisticsComponent } from './components/charts/user-statistics/user-statistics.component';
import { ForestStatisticsComponent } from './components/charts/forest-statistics/forest-statistics.component';
import { AdminReportsStatisticsComponent } from './components/charts/admin-reports-statistics/admin-reports-statistics.component';

/* Services */
import { DatabaseRequestService } from './services/database-request.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    AlertComponent,
    UserProfileComponent,
    UserPanelComponent,
    UserProfileDialogComponent,
    ChangePasswordComponent,
    FormControlComponent,
    MainNavComponent,
    SideBarComponent,
    NavContentComponent,
    DashboardComponent,
    ForestComponent,
    NewEventComponent,
    StatisticsComponent,
    EventsComponent,
    ForestsComponent,
    UsersComponent,
    ActionButtonDialogComponent,
    ForestLocationDialogComponent,
    GoogleMapsSearchComponent,
    ListDialogComponent,
    EditForestDialogComponent,
    RemoveFieldDialogComponent,
    NewTreeTypeDialogComponent,
    EditCoordinatesDialogComponent,
    NewCoordinatesDialogComponent,
    ValidateEventsComponent,
    ConfirmationDialogComponent,
    ShowImageDialogComponent,
    ShowLongTextDialogComponent,
    NewIssueDialogComponent,
    IssuesHistoryComponent,
    ForesterRequestComponent,
    EditForestNameComponent,
    EditForestSurfaceComponent,
    TreeTypesTableComponent,
    LocationTableComponent,
    MatToolbarMessageComponent,
    PageTitleComponent,
    PageSubtitleComponent,
    EditTreeTypeDialogComponent,
    DatePickerComponent,
    ForestIssuesStatisticsComponent,
    ForestProblemTypeStatisticsComponent,
    UserStatisticsComponent,
    ForestStatisticsComponent,
    AdminReportsStatisticsComponent,
  ],
  entryComponents: [
    UserProfileDialogComponent,
    ActionButtonDialogComponent,
    ForestLocationDialogComponent,
    ListDialogComponent,
    EditForestDialogComponent,
    RemoveFieldDialogComponent,
    NewTreeTypeDialogComponent,
    EditCoordinatesDialogComponent,
    NewCoordinatesDialogComponent,
    ConfirmationDialogComponent,
    ShowImageDialogComponent,
    ShowLongTextDialogComponent,
    NewIssueDialogComponent,
    EditTreeTypeDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxKTQhP9FucPUPnJvG1yqSXt6L9NKnUSI',
      libraries: ['drawing', 'places']
    }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule,
    MatDatepickerModule,
  ],
  providers: [DatabaseRequestService, CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
