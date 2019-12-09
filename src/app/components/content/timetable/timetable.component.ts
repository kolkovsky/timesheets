import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimetableService} from "../../../services/timetable.service";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {UiGroupModel} from "../../../models/ui-group.model";
import {StateService} from "../../../services/state.service";
import {takeUntil, tap} from "rxjs/operators";
import {PopupDetails} from "../../../shared/popup/popup.component";
import {TtpComponentInterface} from "../../../interfaces/ttp-component.interface";
import {ScreensEnum} from "../../../constants/screens.enum";
import {Subject} from "rxjs";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent implements OnInit, OnDestroy, TtpComponentInterface {

  public uiGroup: UiGroupModel;
  public weekdays: any [] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: any[] = Object.keys(TimetableUtils.lessonTimes);
  public lessonTypes: any[] = Object.values(TimetableUtils.lessonTypes);
  public visibleSubjectPopupDetails: boolean = false;
  public visibleSubjectCardDetails: boolean = false;
  public popupDetails: PopupDetails;
  public largeModeEnabled: boolean;

  public selectedSubject: any;

  public readonly popupViewMode: string = "popup";
  public readonly cardViewMode: string = "card";
  public subjectDetailsViewMode: string;

  public selectedWeekDay: string = this.weekdays[0];
  public selectedTime: string = this.times[0];
  public selectedLessonType: string = this.lessonTypes[0];

  public unsubscribeStream$: Subject<void> = new Subject();

  constructor(private timetableService: TimetableService,
              private stateService: StateService) {
  }

  ngOnInit() {
    this.largeModeEnabled = window.innerWidth >= ScreensEnum.large1440px;
    this.stateService.getScreenState()
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe(state => this.changeScreenMode(state));

    this.timetableService.getTimetableByGroup()
      .pipe(
        takeUntil(this.unsubscribeStream$),
        tap((timetable) => this.uiGroup = new UiGroupModel(timetable.name, TimetableUtils.sortSubjectsByWeekDay(timetable.subjects))))
      .subscribe();
  }

  changeScreenMode(screenState: any) {
    this.largeModeEnabled = screenState >= ScreensEnum.large1440px;
    if (this.largeModeEnabled) {
      this.subjectDetailsViewMode = this.cardViewMode;
    } else {
      this.subjectDetailsViewMode = this.popupViewMode;
    }
  }

  public getSubjectByTime(time: string, subjects: any): any {
    return subjects ? subjects.find(subject => subject.time === time) : null;
  }

  public openSubjectDetails(subject: any): void {
    console.log(subject);
    if (this.subjectDetailsViewMode === this.popupViewMode) {
      this.popupDetails = {leftSideHeader: subject.name, rightSideContent: subject.toString(), closable: true};
      this.visibleSubjectPopupDetails = true;
    } else {
      this.selectedSubject = subject;
      this.visibleSubjectCardDetails = true;
    }
  }

  public closeSubjectDetailsPopup(event): void {
    this.visibleSubjectPopupDetails = false;
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }

  public changeTime(event) {
    this.selectedTime = event;
  }

  public changeLessonType(event) {
    this.selectedLessonType = event;
  }

  public changeWeekday(event) {
    this.selectedWeekDay = event;
  }

  ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
