import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './components/welcome/welcome-page.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursePageComponent} from './components/courses/course-page.component';
import {GroupPageComponent} from './components/groups/group-page.component';
import {AppRouterModule} from './components/app-router.module';
import {RouterModule} from '@angular/router';
import {AlertModule, ButtonsModule, ModalModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AdminParsingComponent} from './components/admin-parsing/admin-parsing.component';
import {AdminParsingService} from './services/admin-parsing.service';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {PopupComponent} from './shared/popup/popup.component';
import {PopupService} from "./shared/popup/popup.service";
import {TimetableParsingComponent} from "./components/timetable-parsing/timetable-parsing.component";
import {CourseDetailsComponent} from "./components/timetable-parsing/course-details/course-details.component";

let adminConfigurations = [
  TimetableParsingComponent,
  AdminParsingComponent,
  CourseDetailsComponent
];

let sharedComponents = [
  SelectorComponent,
  PopupComponent
];

let externalLibs = [
  ButtonsModule.forRoot(),
  Ng4LoadingSpinnerModule.forRoot(),
  ModalModule.forRoot(),
  AlertModule.forRoot()
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    CoursePageComponent,
    GroupPageComponent,
    sharedComponents,
    adminConfigurations
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    externalLibs
  ],
  providers: [
    AdminParsingService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
