import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TtpHomeComponent } from "./components/home/home.component";
import { TtpHeaderComponent } from "./components/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRouterModule } from "./components/app-router.module";
import { RouterModule } from "@angular/router";
import { AlertModule, BsDropdownModule, ButtonsModule } from "ngx-bootstrap";
import { SelectorComponent } from "./shared/selector/selector.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TtpFileParsingComponent } from "./components/parsing/file-parsing.component";
import { FileService } from "./services/file.service";
import { TtpTimetableComponent } from "./components/timetable/timetable.component";
import { CardComponent } from "./shared/card/card.component";
import { IconComponent } from "./shared/icon/icon.component";
import { StateService } from "./services/state.service";
import { TableComponent } from "./components/timetable/table/table.component";
import { TtpGroupButtonComponent } from "./shared/group-button/ttp-group-button.component";
import { TtpButtonComponent } from "./shared/button/ttp-button.component";
import { TtpBaseComponent } from "./ng-core/ttp-base.component";
import { TtpBannerComponent } from "./shared/banner/ttp-banner.component";
import { TtpLoginComponent } from "./components/login/login.component";
import { TtpNotificationComponent } from "./shared/notification/notification.component";
import { LoginService } from "./services/login.service";
import { TtpLoaderComponent } from "./shared/loader/ttp-loader.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderService } from "./services/loader.service";
import { TimetableService } from "./services/timetable.service";
import { TtpEditTimetableComponent } from "./components/timetable/edit-timetable/edit-timetable.component";
import { TtpPopupComponent } from "./shared/popup/popup.component";
import { TtpDropdownComponent } from "./shared/dropdown/dropdown.component";
import { TtpAddTimetableComponent } from "./components/timetable/add-timetable/add-timetable.component";

let adminConfigurations = [
  AppComponent,
  TtpHomeComponent,
  TtpHeaderComponent,
  TtpTimetableComponent,
  TtpFileParsingComponent,
  TableComponent,
  TtpLoginComponent,
  TtpEditTimetableComponent,
  TtpAddTimetableComponent,
];

let sharedComponents = [
  SelectorComponent,
  CardComponent,
  IconComponent,
  TtpGroupButtonComponent,
  TtpButtonComponent,
  TtpBannerComponent,
  TtpNotificationComponent,
  TtpLoaderComponent,
  TtpPopupComponent,
  TtpDropdownComponent,
];

export const AppComponents = [sharedComponents, adminConfigurations];

let externalLibs = [
  ButtonsModule.forRoot(),
  AlertModule.forRoot(),
  BsDropdownModule.forRoot(),
  NgxSpinnerModule,
];

@NgModule({
  declarations: [AppComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    externalLibs,
  ],
  providers: [
    FileService,
    StateService,
    LoginService,
    LoaderService,
    TimetableService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
