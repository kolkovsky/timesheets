import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TimetableComponent} from "../components/content/timetable/timetable.component";
import {CoursePageComponent} from "../components/content/courses/course-page.component";
import {GroupPageComponent} from "../components/content/groups/group-page.component";
import {WelcomePageComponent} from "../components/content/welcome/welcome-page.component";
import {WeekdayDetailsComponent} from "../components/content/timetable/mobile-view/weekday-details/weekday-details.component";
import {WeekdaysComponent} from "../components/content/timetable/mobile-view/weekdays/weekdays.component";

export const routes = [
  {
    path: 'timetable',
    component: TimetableComponent,
    children: [
      {
        path: 'day/:weekday',
        component: WeekdayDetailsComponent,
      },
      {
        path: '',
        component: WeekdaysComponent,
        pathMatch: 'full'
      }
    ],
    data: {animation: 'TimetablePage'}
  },
  {path: 'course', component: CoursePageComponent, data: {animation: 'CoursePage'}},
  {path: 'group', component: GroupPageComponent, data: {animation: 'GroupPage'}},
  {path: 'welcome', component: WelcomePageComponent, data: {animation: 'WelcomePage'}},
  {path: '', component: WelcomePageComponent, data: {animation: 'WelcomePage'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RouteRoutingModule {
}
