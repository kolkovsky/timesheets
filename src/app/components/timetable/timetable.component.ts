import {Component, OnInit} from '@angular/core';
import {TimetableService} from "../../services/timetable.service";
import {WeekDaysConstant} from "../../constants/week-days.constant";
import {TimetableUtils} from "../../utils/timetable.utils";
import {UiGroupModel} from "../../models/ui-group.model";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent implements OnInit {


  private subject: any;
  public uiGroup: UiGroupModel;
  public weekdays: any [] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: any[] = Object.keys(TimetableUtils.lessonTimes);

  constructor(private timetableService: TimetableService) {
  }

  ngOnInit() {
    this.timetableService.getTimetableByGroup().subscribe(timetable => {
      this.uiGroup = {
        id: timetable.id,
        name: timetable.name,
        sortedSubjects: TimetableUtils.sortSubjectsByWeekDay(timetable.subjects)
      };
      console.log(this.uiGroup);
    })
  }

  public getSubjectByTime(time: string, subjects: any): any {
    return this.subject = subjects.find(subject => subject.time === time);
  }

  public getLessonType(lessonType: string): string {
    return TimetableUtils.getformattingLessonType(lessonType);
  }

  public getClassIconForLessonType(lessonType: string): string {
    return TimetableUtils.getClassIconForLessonType(lessonType);
  }


  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }

}
