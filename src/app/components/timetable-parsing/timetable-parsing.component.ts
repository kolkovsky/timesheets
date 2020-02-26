import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'ttp-timetable-parsing',
  templateUrl: './timetable-parsing.component.html',
  styleUrls: ['./timetable-parsing.component.less']
})
export class TimetableParsingComponent extends TtpBaseComponent {


  public groupsButtons: ButtonModel[] = [
    {
      id: 'sdsd', label: '12', clicked: false
    },
    {
      id: 's5', label: '213', clicked: false
    },
    {
      id: 's132', label: '234324', clicked: false
    }
  ];

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
    if (localStorage.getItem('Timetable')) {
      this.timeSheets = JSON.parse(localStorage.getItem('Timetable'));
      this.uiTimesheets = this.timeSheets.map(timeSheet => this.convertToUiTimesheet(timeSheet));
    }

    this.adminParsingService.importData$
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe(data => {
        this.timeSheets = data;
        localStorage.setItem('Timetable', JSON.stringify(this.timeSheets));
        this.uiTimesheets = this.timeSheets.map(timeSheet => this.convertToUiTimesheet(timeSheet));
      });
  }

  public processState(state: StateInterface): void {
    console.log('Yep');
  }

  public click(): void {
    this.stateService.setStateComponent({
      componentName: TimetableParsingComponent.name,
      payload: {name: 'dfdf'}
    });
  }

  private convertToUiTimesheet(timesheet: any): UiTimesheetModel {
    return new UiTimesheetModel(timesheet.course, this.convertToUiGroup(timesheet.groups));
  }

  private convertToUiGroup(groups: any): UiGroupModel[] {
    return groups.map(group => new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects)));
  }
}
