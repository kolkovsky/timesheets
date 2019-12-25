import {Component, OnInit} from "@angular/core";
import {AdminParsingService} from "../../services/admin-parsing.service";
import {TimetableUtils} from "../../utils/timetable.utils";
import {UiTimesheetModel} from "../../models/ui-timesheet.model";
import {UiGroupModel} from "../../models/ui-group.model";
import {TimesheetModel} from "../../models/timesheet.model";
import {WeekDaysConstant} from "../../constants/week-days.constant";

@Component({
  selector: 'ttp-timetable-parsing',
  templateUrl: './timetable-parsing.component.html',
  styleUrls: ['./timetable-parsing.component.less']
})

export class TimetableParsingComponent implements OnInit {

  public weekday:string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);
  public timeSheets: TimesheetModel[];
  public uiTimesheets: UiTimesheetModel[];

  constructor(private adminParsingService: AdminParsingService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("Timetable")) {
      this.timeSheets = JSON.parse(localStorage.getItem("Timetable"));
      this.uiTimesheets = this.timeSheets.map(timeSheet => this.convertToUiTimesheet(timeSheet));
      console.log(this.uiTimesheets);
    }

    this.adminParsingService.importData$.subscribe(data => {
      this.timeSheets = data;
      localStorage.setItem("Timetable", JSON.stringify(this.timeSheets));
      this.uiTimesheets = this.timeSheets.map(timeSheet => this.convertToUiTimesheet(timeSheet));
    });

    console.log(this.uiTimesheets)
  }

  private convertToUiTimesheet(timesheet: any): UiTimesheetModel {
    return new UiTimesheetModel(timesheet.course, this.convertToUiGroup(timesheet.groups));
  }

  private convertToUiGroup(groups: any): UiGroupModel[] {
    return groups.map(group => new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects)))

  }

}
