import {Component, OnInit} from '@angular/core';
import {TimetableService} from "../../../services/timetable.service";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {UiGroupModel} from "../../../models/ui-group.model";
import {StateApplication, StateService} from "../../../services/state.service";
import {tap} from "rxjs/operators";
import {SystemsConstant} from "../../../constants/systems.constant";
import {PopupDetails} from "../../../shared/popup/popup.component";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent implements OnInit {

  public uiGroup: UiGroupModel;
  public weekdays: any [] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: any[] = Object.keys(TimetableUtils.lessonTimes);
  public viewMode: string;
  public selectedWeekDay: string = WeekDaysConstant.WEEK_DAY_MONDAY;
  public visibleSubjectPopupDetails: boolean = false;
  public popupDetails: PopupDetails;

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
    return subjects ? subjects.find(subject => subject.time === time) : null;
  }

  public changeDay(day: string): void {
    this.selectedWeekDay = day;
  }

  public openSubjectDetails(subject: any): void {
    this.popupDetails = {leftSideHeader: subject.name, rightSideContent: subject.toString(), closable: true};
    this.visibleSubjectPopupDetails = true;
  }

  public closeSubjectDetailsPopup(event): void {
    this.visibleSubjectPopupDetails = false;
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
