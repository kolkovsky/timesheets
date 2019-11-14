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
import {ButtonsModule} from 'ngx-bootstrap';
import {SelectorComponent} from './shared/selector/selector.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TimetableComponent} from "./components/timetable/timetable.component";
import {IconComponent} from "./shared/icon/icon.component";
import {CardComponent} from "./components/timetable/card/card.component";
import {GridComponent} from "./components/timetable/grid/grid.component";
import {NavigationGuard} from "./services/navigation.guard";
import {TimetableService} from "./services/timetable.service";

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
    CardComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    RouterModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    NavigationGuard,
    TimetableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
