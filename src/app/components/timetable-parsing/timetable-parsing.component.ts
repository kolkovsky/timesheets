import {Component, OnInit} from "@angular/core";
import {AdminParsingService} from "../../services/admin-parsing.service";
import {TimetableModel} from "../../models/timetable.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {TimetableUtils} from "../../utils/timetable.utils";
import {UiTimesheetModel} from "../../models/ui-timesheet.model";
import {UiGroupModel} from "../../models/ui-group.model";

@Component({
  selector: 'ttp-timetable-parsing',
  templateUrl: './timetable-parsing.component.html',
  styleUrls: ['./timetable-parsing.component.less']
})

export class TimetableParsingComponent implements OnInit {

  public timetable: TimetableModel;
  public uiTimesheets: UiTimesheetModel[];

  constructor(private adminParsingService: AdminParsingService,
              private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit(): void {
    this.adminParsingService.importData$.subscribe(data => {
      this.timetable = data;
      this.uiTimesheets = this.timetable.timeSheets.map(timesheet => this.convertToUiTimesheet(timesheet));
    });
  }

  private convertToUiTimesheet(timesheet: any): UiTimesheetModel {
    return new UiTimesheetModel(timesheet.course, this.convertToUiGroup(timesheet.groups));
  }

  private convertToUiGroup(groups: any): UiGroupModel[] {
    return groups.map(group => new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects)))

  }

}
