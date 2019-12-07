import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './components/content/welcome/welcome-page.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursePageComponent} from './components/content/courses/course-page.component';
import {GroupPageComponent} from './components/content/groups/group-page.component';
import {RouterModule} from '@angular/router';
import {ButtonsModule, CollapseModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TimetableComponent} from "./components/content/timetable/timetable.component";
import {IconComponent} from "./shared/icon/icon.component";
import {NavigationGuard} from "./services/navigation.guard";
import {TimetableService} from "./services/timetable.service";
import {FooterComponent} from "./components/footer/footer.component";
import {StateService} from "./services/state.service";
import {routes} from "./routes/routes";
import {TttPopupComponent} from "./shared/popup/popup.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    CoursePageComponent,
    GroupPageComponent,
    SelectorComponent,
    TimetableComponent,
    IconComponent,
    FooterComponent,
    TttPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(routes),
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    NavigationGuard,
    TimetableService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
