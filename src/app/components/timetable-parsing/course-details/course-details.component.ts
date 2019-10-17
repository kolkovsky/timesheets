import {Component, Input, OnInit} from "@angular/core";
import {UiTimesheetModel} from "../../../models/ui-timesheet.model";
import {UiGroupModel} from "../../../models/ui-group.model";
import {WeekDaysConstant} from "../../../constants/week-days.constant";


@Component({
  selector: "course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.less"]
})

export class CourseDetailsComponent implements OnInit {
  @Input() timesheet: UiTimesheetModel;

  public weekDays: string[];
  public groups: UiGroupModel[];

  ngOnInit(): void {
    this.weekDays = WeekDaysConstant.WEEK_DAYS_ARRAY;
    this.loadGroupsForTimesheet();
  }


  public loadGroupsForTimesheet(): void {
    if (this.timesheet) {
      this.groups = this.timesheet.uiGroups;
    }
  }

}
