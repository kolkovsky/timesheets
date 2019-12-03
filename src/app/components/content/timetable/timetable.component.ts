import {Component, OnInit} from '@angular/core';
import {TimetableService} from "../../../services/timetable.service";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {UiGroupModel} from "../../../models/ui-group.model";
import {StateApplication, StateService} from "../../../services/state.service";
import {tap} from "rxjs/operators";
import {SystemsConstant} from "../../../constants/systems.constant";

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
  public viewMode: string;
  public selectedWeekDay: string = WeekDaysConstant.WEEK_DAY_WEDNESDAY;

  constructor(private timetableService: TimetableService,
              private stateService: StateService) {
  }

  ngOnInit() {
    this.stateService.getComponentState()
      .pipe(tap((state) => this.stateProcess(state)))
      .subscribe();

    this.timetableService.getTimetableByGroup()
      .pipe(tap((timetable) => this.uiGroup = new UiGroupModel(timetable.name, TimetableUtils.sortSubjectsByWeekDay(timetable.subjects))))
      .subscribe();
  }

  private stateProcess(state: StateApplication): void {
    if (state.componentName === SystemsConstant.headerComponent) {
      this.viewMode = state.states.viewModeValue;
    }
  }

  public getSubjectByTime(time: string, subjects: any): any {
    let sortedSubject = subjects ? subjects[0] : "";
    if (!sortedSubject) {
      return null;
    }
    return this.subject = sortedSubject.find(subject => subject.time === time);
  }

  public changeDay(day: string):void {
    this.selectedWeekDay = day;
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
