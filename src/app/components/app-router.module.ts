import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursePageComponent} from './courses/course-page.component';
import {GroupPageComponent} from './groups/group-page.component';
import {WelcomePageComponent} from './welcome/welcome-page.component';
import { TimetableComponent } from './timetable/timetable.component';

const routes: Routes = [
  {path: 'timetable', component: TimetableComponent, data: {animation: 'TimetablePage'}},
  {path: 'course', component: CoursePageComponent, data: {animation : 'CoursePage'}},
  {path: 'group', component: GroupPageComponent, data: {animation: 'GroupPage'}},
  {path: 'welcome', component: WelcomePageComponent, data: {animation: 'WelcomePage'}},
  {path: '', component: WelcomePageComponent, data: {animation: 'WelcomePage'}}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  declarations: []
})

export class AppRouterModule {}
