import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './components/welcome/welcome-page.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouterModule} from './components/app-router.module';
import {RouterModule} from '@angular/router';
import {AlertModule, BsDropdownModule, ButtonsModule, ModalModule, ProgressbarModule, TabsModule, CarouselModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminParsingComponent} from './components/admin-parsing/admin-parsing.component';
import {AdminParsingService} from './services/admin-parsing.service';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {PopupService} from "./shared/popup/popup.service";
import {TimetableParsingComponent} from "./components/timetable-parsing/timetable-parsing.component";
import {CardComponent} from "./shared/card/card.component";
import {IconComponent} from "./shared/icon/icon.component";
import {PopupComponent} from "./shared/popup/popup.component";
import {StateService} from "./services/state.service";
import {TableComponent} from "./components/timetable-parsing/table/table.component";
import {TtpGroupButtonComponent} from './shared/group-button/ttp-group-button.component';
import {TtpButtonComponent} from './shared/button/ttp-button.component';
import {TtpDropdownComponent} from './shared/dropdown/ttp-dropdown.component';
import {TtpBaseComponent} from './ng-core/ttp-base.component';
import {TtpBannerComponent} from './shared/banner/ttp-banner.component';
import {LoginComponent} from './components/login/login.component';
import { NotificationComponent } from './shared/notification/notification.component';

let adminConfigurations = [
  AppComponent,
  WelcomePageComponent,
  HeaderComponent,
  TimetableParsingComponent,
  AdminParsingComponent,
  TableComponent,
  LoginComponent
];

let sharedComponents = [
  SelectorComponent,
  CardComponent,
  IconComponent,
  PopupComponent,
  TtpGroupButtonComponent,
  TtpButtonComponent,
  TtpDropdownComponent,
  TtpBannerComponent,
  NotificationComponent
];

export const AppComponents = [
  sharedComponents,
  adminConfigurations
];

let externalLibs = [
  ButtonsModule.forRoot(),
  Ng4LoadingSpinnerModule.forRoot(),
  ModalModule.forRoot(),
  AlertModule.forRoot(),
  TabsModule.forRoot(),
  ProgressbarModule.forRoot(),
  BsDropdownModule.forRoot(),
  CarouselModule.forRoot()
];


@NgModule({
  declarations: [
    AppComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    externalLibs
  ],
  providers: [
    AdminParsingService,
    PopupService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
