import { Component, HostListener, OnInit } from "@angular/core";
import { AdminParsingService } from "../../services/admin-parsing.service";
import { TimetableUtils } from "../../utils/timetable.utils";
import { UiTimesheetModel } from "../../models/ui-timesheet.model";
import { UiGroupModel } from "../../models/ui-group.model";
import { TimesheetModel } from "../../models/timesheet.model";
import { WeekDaysConstant } from "../../constants/week-days.constant";
import { StateInterface } from "../../interfaces/state.interface";
import { ButtonModel } from "../../models/button.model";
import { TtpBaseComponent } from "../../ng-core/ttp-base.component";
import { StateService } from "../../services/state.service";
import { takeUntil, tap, finalize } from "rxjs/operators";
import { GroupModel } from "../../models/group.model";
import { TimetableService } from "src/app/services/timetable.service";
import { LoaderService } from "src/app/services/loader.service";
import { group } from "@angular/animations";

@Component({
  selector: "ttp-timetable-parsing",
  templateUrl: "./timetable-parsing.component.html",
})
export class TimetableParsingComponent extends TtpBaseComponent {
  public courses: ButtonModel[];
  public groups: ButtonModel[];
  public weekdays: string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);
  public timeSheets: TimesheetModel[];
  public uiTimesheets: UiTimesheetModel[];
  public selectedCourse: any;
  public selectedUiGroup: UiGroupModel;

  constructor(
    private timetableService: TimetableService,
    private loaderService: LoaderService,
    private adminParsingService: AdminParsingService,
    protected stateService: StateService
  ) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.loaderService.showDefaultLoader("Loading");
    this.loadTimetable();
    this.loadTimetableFromServer();
  }

  private loadTimetable(): void {
    this.adminParsingService.importData$
      .pipe(
        takeUntil(this.unsubscribeStream$),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe((data: TimesheetModel[]) => {
        this.initTimetableData(data);
      });
  }

  private initTimetableData(timetableResponse: any): void {
    this.timeSheets = timetableResponse;
    this.courses = this.initCourses(this.timeSheets);
    this.uiTimesheets = this.timeSheets.map((timeSheet) =>
      this.convertToUiTimesheet(timeSheet)
    );
  }

  private loadTimetableFromServer(): void {
    this.timetableService
      .getTimetable()
      .pipe(
        tap((timetable) => this.initTimetableData(timetable)),
        takeUntil(this.unsubscribeStream$),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe();
  }

  public selectCourse(event: ButtonModel): void {
    this.selectedCourse = event.label;
    const timesheetModel: TimesheetModel = this.timeSheets.find(
      (timesheet: TimesheetModel) => timesheet.course.toString() === event.label
    );
    this.groups = timesheetModel.groups.map(
      (group: GroupModel) => new ButtonModel(group.name, false)
    );
  }

  public processState(state: StateInterface): void {}

  private initGroups(timesheets: TimesheetModel[]): ButtonModel[] {
    return timesheets.map(
      (timesheet: TimesheetModel) =>
        new ButtonModel(timesheet.course.toString() + " курс", false)
    );
  }

  private initCourses(timesheets: TimesheetModel[]): ButtonModel[] {
    return timesheets.map(
      (timesheet: TimesheetModel) =>
        new ButtonModel(timesheet.course.toString(), false)
    );
  }

  private convertToUiTimesheet(timesheet: any): UiTimesheetModel {
    return new UiTimesheetModel(
      timesheet.course,
      this.convertToUiGroup(timesheet.groups)
    );
  }

  private convertToUiGroup(groups: any): UiGroupModel[] {
    return groups.map(
      (group) =>
        new UiGroupModel(
          group.name,
          TimetableUtils.sortSubjectsByWeekDay(group.subjects)
        )
    );
  }

  public selectGroup(event: ButtonModel): void {
    const timesheetModel: TimesheetModel = this.timeSheets.find(
      (timesheet: TimesheetModel) => timesheet.course.toString() === event.label
    );
    this.selectedUiGroup = this.convertToUiGroup(timesheetModel.groups).find(
      (group) => group.name == event.label
    );
  }
}
