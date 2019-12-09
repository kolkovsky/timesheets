import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimetableService} from "../../../services/timetable.service";
import {UiGroupModel} from "../../../models/ui-group.model";
import {StateService} from "../../../services/state.service";
import {takeUntil, tap} from "rxjs/operators";
import {PopupDetails} from "../../../shared/popup/popup.component";
import {TimetableComponentClass} from "./timetable.model";
import {GroupModel} from "../../../models/group.model";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent extends TimetableComponentClass implements OnInit, OnDestroy {

  public uiGroup: UiGroupModel;

  public visibleSubjectPopupDetails: boolean = false;
  public visibleSubjectCardDetails: boolean = false;
  public popupDetails: PopupDetails;

  public selectedSubject: any;
  public selectedWeekDay: string = this.weekdays[0];
  public selectedTime: string = this.times[0];
  public selectedLessonType: string = this.lessonTypes[0];

  constructor(private timetableService: TimetableService,
              private stateService: StateService) {
    super();
  }

  ngOnInit() {
    this.changeScreenMode(window.innerWidth);
    this.stateService.getScreenState()
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe(state => this.changeScreenMode(state));

    this.timetableService.getTimetableByGroup()
      .pipe(
        takeUntil(this.unsubscribeStream$),
        tap((group: GroupModel) => this.uiGroup = this.processUiGroup(group)))
      .subscribe();
  }

  public openSubjectDetails(subject: any): void {
    //todo Refactoring

    // if (this.subjectDetailsViewMode === this.popupViewMode) {
    //   this.popupDetails = {leftSideHeader: subject.name, rightSideContent: subject.toString(), closable: true};
    //   this.visibleSubjectPopupDetails = true;
    // } else {
    //   this.selectedSubject = subject;
    //   this.visibleSubjectCardDetails = true;
    // }
  }

  public closeSubjectDetailsPopup(event): void {
    this.visibleSubjectPopupDetails = false;
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
