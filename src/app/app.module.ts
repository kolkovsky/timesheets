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
import {CardComponent} from "./shared/card/card.component";
import {ControllersComponent} from "./components/timetable-parsing/controllers/controllers.component";
import {IconComponent} from "./shared/icon/icon.component";
import {CourseDetailsItemComponent} from "./components/timetable-parsing/course-details/course-details-item/course-details-item.component";
import {CourseDetailsEmptyComponent} from "./components/timetable-parsing/course-details/course-details-empty/course-details-empty.component";

let adminConfigurations = [
  TimetableParsingComponent,
  AdminParsingComponent,
  CourseDetailsComponent,
  ControllersComponent,
  CourseDetailsItemComponent,
  CourseDetailsEmptyComponent
];

let sharedComponents = [
  SelectorComponent,
  PopupComponent,
  CardComponent,
  IconComponent
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
