import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeekdayDetailsComponent} from "../components/content/timetable/mobile-view/weekday-details/weekday-details.component";
import {SubjectDetailsComponent} from "../components/content/timetable/mobile-view/subject-details/subject-details.component";
import {WeekdaysComponent} from "../components/content/timetable/mobile-view/weekdays/weekdays.component";
import {TimetableComponent} from "../components/content/timetable/timetable.component";

const mobileComponents: Routes = [
  {
    path: '',
    component: TimetableComponent,
    children: [
      {
        path: 'weekday-details',
        component: WeekdayDetailsComponent,
      },
      {
        path: 'subject-details',
        component: SubjectDetailsComponent,
      },
      {
        path: 'weekdays',
        component: WeekdaysComponent,
      },
      {
        path: '',
        redirectTo: 'weekdays',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mobileComponents)
  ],
  exports: [
    RouterModule
  ]
})
export class MobileRoutingModule {
}
