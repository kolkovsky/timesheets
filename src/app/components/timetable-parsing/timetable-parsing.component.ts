import {Component, HostListener, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {TimetableUtils} from '../../utils/timetable.utils';
import {UiTimesheetModel} from '../../models/ui-timesheet.model';
import {UiGroupModel} from '../../models/ui-group.model';
import {TimesheetModel} from '../../models/timesheet.model';
import {WeekDaysConstant} from '../../constants/week-days.constant';
import {StateInterface} from '../../interfaces/state.interface';
import {ButtonModel} from '../../models/button.model';
import {TtpBaseComponent} from '../../ng-core/ttp-base.component';
import {StateService} from '../../services/state.service';
import {takeUntil} from 'rxjs/operators';
import {GroupModel} from '../../models/group.model';

@Component({
  selector: 'ttp-timetable-parsing',
  templateUrl: './timetable-parsing.component.html'
})
export class TimetableParsingComponent extends TtpBaseComponent {

  //todo test performance
  /*
  @HostListener('window:resize') screenResize(): void {
    this.stateService.setStateComponent({
      componentName: TimetableParsingComponent.name, payload: {
        stateName: States.screenResizeState,
        screenWidth: window.innerWidth
      }
    });
  }
   */

  public courses: ButtonModel[];
  public groups: ButtonModel[];
  public weekday: string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);
  public timeSheets: TimesheetModel[];
  public uiTimesheets: UiTimesheetModel[];

  constructor(private adminParsingService: AdminParsingService,
              protected stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.loadTimetable();
  }

  private loadTimetable(): void {
    this.adminParsingService.importData$
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe((data: TimesheetModel[]) => {
        this.timeSheets = data;
        this.courses = this.initCourses(this.timeSheets);
        this.uiTimesheets = this.timeSheets.map(timeSheet => this.convertToUiTimesheet(timeSheet));
      });
  }

  public chooseCourse(event: ButtonModel): void {
    const timesheetModel: TimesheetModel = this.timeSheets
      .find((timesheet: TimesheetModel) => timesheet.course.toString() === event.label);
    this.groups = timesheetModel.groups.map((group: GroupModel) => new ButtonModel(group.name, false));
  }

  public processState(state: StateInterface): void {

  }

  private initGroups(timesheets: TimesheetModel[]): ButtonModel[] {
    return timesheets.map((timesheet: TimesheetModel) => new ButtonModel(timesheet.course.toString() + ' курс', false));
  }

  private initCourses(timesheets: TimesheetModel[]): ButtonModel[] {
    return timesheets.map((timesheet: TimesheetModel) => new ButtonModel(timesheet.course.toString(), false));
  }

  private convertToUiTimesheet(timesheet: any): UiTimesheetModel {
    return new UiTimesheetModel(timesheet.course, this.convertToUiGroup(timesheet.groups));
  }

  private convertToUiGroup(groups: any): UiGroupModel[] {
    return groups.map(group => new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects)));
  }
}
