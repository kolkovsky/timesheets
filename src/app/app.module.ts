import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './components/content/welcome/welcome-page.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursePageComponent} from './components/content/courses/course-page.component';
import {GroupPageComponent} from './components/content/groups/group-page.component';
import {BsDropdownModule, ButtonsModule, CollapseModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TimetableComponent} from "./components/content/timetable/timetable.component";
import {IconComponent} from "./shared/icon/icon.component";
import {NavigationGuard} from "./services/navigation.guard";
import {TimetableService} from "./services/timetable.service";
import {FooterComponent} from "./components/footer/footer.component";
import {StateService} from "./services/state.service";
import {TttPopupComponent} from "./shared/popup/popup.component";
import {DropdownComponent} from "./shared/dropdown/dropdown.component";
import {MobileTimetableComponent} from "./components/content/timetable/mobile-view/mobile-timetable.component";
import {TableComponent} from "./components/content/timetable/table/table.component";
import {ControllersComponent} from "./components/content/timetable/controllers/controllers.component";
import {CardComponent} from "./shared/card/card.component";
import {WeekdayDetailsComponent} from "./components/content/timetable/mobile-view/weekday-details/weekday-details.component";
import {RouteRoutingModule} from "./routes/route-routing.module";
import {WeekdaysComponent} from "./components/content/timetable/mobile-view/weekdays/weekdays.component";
import {LegendsComponent} from "./components/content/timetable/legends/legends.component";

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
    TttPopupComponent,
    DropdownComponent,
    MobileTimetableComponent,
    TableComponent,
    ControllersComponent,
    CardComponent,
    WeekdayDetailsComponent,
    WeekdaysComponent,
    LegendsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouteRoutingModule,
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
