import {Routes} from "@angular/router";
import {TimetableComponent} from "../components/content/timetable/timetable.component";
import {NavigationGuard} from "../services/navigation.guard";
import {CoursePageComponent} from "../components/content/courses/course-page.component";
import {GroupPageComponent} from "../components/content/groups/group-page.component";
import {WelcomePageComponent} from "../components/content/welcome/welcome-page.component";

export const routes = [
  {path: 'timetable', component: TimetableComponent, data: {animation: 'TimetablePage'}, canActivate:[NavigationGuard]},
  {path: 'course', component: CoursePageComponent, data: {animation: 'CoursePage'}, canActivate:[NavigationGuard]},
  {path: 'group', component: GroupPageComponent, data: {animation: 'GroupPage'}, canActivate:[NavigationGuard]},
  {path: 'welcome', component: WelcomePageComponent, data: {animation: 'WelcomePage'}},
  {path: '', component: WelcomePageComponent, data: {animation: 'WelcomePage'}}
];
