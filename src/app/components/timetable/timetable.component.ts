import { Component } from "@angular/core";
import { FileService } from "../../services/file.service";
import { TimetableUtils } from "../../utils/timetable.utils";
import { UiTimesheetModel } from "../../models/ui-timesheet.model";
import { UiGroupModel } from "../../models/ui-group.model";
import { TimesheetModel } from "../../models/timesheet.model";
import { WeekDaysConstant } from "../../constants/week-days.constant";
import { State } from "../../interfaces/state.interface";
import { ButtonModel } from "../../models/button.model";
import { TtpBaseComponent } from "../../ng-core/ttp-base.component";
import { StateService } from "../../services/state.service";
import { takeUntil, tap, finalize, catchError } from "rxjs/operators";
import { GroupModel } from "../../models/group.model";
import { TimetableService } from "src/app/services/timetable.service";
import { LoaderService } from "src/app/services/loader.service";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { TtpHeaderComponent } from "../header/header.component";
import { States } from "src/app/constants/states";

@Component({
  selector: "ttp-timetable",
  templateUrl: "./timetable.component.html",
})
export class TtpTimetableComponent extends TtpBaseComponent {
  public courses: ButtonModel[];
  public groups: ButtonModel[];
  public weekdays: string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);
  public timeSheets: TimesheetModel[];
  public uiTimesheets: UiTimesheetModel[];
  public selectedCourse: any;
  public selectedUiGroup: UiGroupModel;
  public showAddButton: boolean;
  public visibleWarningMessage: boolean;

  constructor(
    private timetableService: TimetableService,
    private loaderService: LoaderService,
    private fileService: FileService,
    protected stateService: StateService
  ) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.loaderService.showLoader("Loading");
    this.loadTimetable();
    this.loadTimetableFromServer();
  }

  public processState(state: State): void {}

  private loadTimetable(): void {
    this.fileService.importData$
      .pipe(
        takeUntil(this.unsubscribeStream$),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe((timeSheets: TimesheetModel[]) =>
        this.initTimetableData(timeSheets)
      );
  }

  private loadTimetableFromServer(): void {
    this.timetableService
      .getTimetable()
      .pipe(
        tap((timeSheets: TimesheetModel[]) =>
          this.initTimetableData(timeSheets)
        ),
        takeUntil(this.unsubscribeStream$),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.hideHeaderButtons();
          this.visibleWarningMessage = true;
          return of(null);
        }),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe();
  }

  private initTimetableData(timeSheets: TimesheetModel[]): void {
    this.timeSheets = timeSheets;
    this.courses = this.initCourses(this.timeSheets);
    this.uiTimesheets = this.timeSheets.map((timeSheet) =>
      this.convertToUiTimesheet(timeSheet)
    );
  }

  private hideHeaderButtons(): void {
    this.stateService.setStateComponent({
      componentName: TtpHeaderComponent.name,
      payload: { stateName: States.hideCreateTimetableButton },
    });

    this.stateService.setStateComponent({
      componentName: TtpHeaderComponent.name,
      payload: { stateName: States.hideEditTimtableButton },
    });
  }

  public selectCourse(selectedButton: ButtonModel): void {
    this.selectedCourse = selectedButton.label;
    const timesheetModel: TimesheetModel = this.timeSheets.find(
      (timesheet: TimesheetModel) =>
        timesheet.course.toString() === selectedButton.label
    );
    this.groups = timesheetModel.groups.map(
      (group: GroupModel) => new ButtonModel(group.name, false)
    );
  }

  public selectGroup(selectedButton: ButtonModel): void {
    const timesheetModel: TimesheetModel = this.timeSheets.find(
      (timesheet: TimesheetModel) =>
        timesheet.course.toString() === this.selectedCourse.toString()
    );
    this.selectedUiGroup = this.convertToUiGroup(timesheetModel.groups).find(
      (group: UiGroupModel) => group.name == selectedButton.label
    );
  }

  private initCourses(timesheets: TimesheetModel[]): ButtonModel[] {
    return timesheets.map(
      (timesheet: TimesheetModel) =>
        new ButtonModel(timesheet.course.toString(), false)
    );
  }

  private convertToUiTimesheet(timesheet: TimesheetModel): UiTimesheetModel {
    return new UiTimesheetModel(
      timesheet.course,
      this.convertToUiGroup(timesheet.groups)
    );
  }

  private convertToUiGroup(groups: GroupModel[]): UiGroupModel[] {
    return groups.map(
      (group: GroupModel) =>
        new UiGroupModel(
          group.name,
          TimetableUtils.sortSubjectsByWeekDay(group.subjects)
        )
    );
  }
}
