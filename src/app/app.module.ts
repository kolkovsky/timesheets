import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './components/welcome/welcome-page.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouterModule} from './components/app-router.module';
import {RouterModule} from '@angular/router';
import {AlertModule, ButtonsModule, ModalModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AdminParsingComponent} from './components/admin-parsing/admin-parsing.component';
import {AdminParsingService} from './services/admin-parsing.service';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {PopupService} from "./shared/popup/popup.service";
import {TimetableParsingComponent} from "./components/timetable-parsing/timetable-parsing.component";
import {CardComponent} from "./shared/card/card.component";
import {IconComponent} from "./shared/icon/icon.component";
import {PopupComponent} from "./shared/popup/popup.component";
import {StateService} from "./services/state.service";

let adminConfigurations = [
  TimetableParsingComponent,
  AdminParsingComponent
];

let sharedComponents = [
  SelectorComponent,
  CardComponent,
  IconComponent,
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
    PopupService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
