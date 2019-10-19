import {Component, Input, OnInit} from "@angular/core";
import {UiTimesheetModel} from "../../../models/ui-timesheet.model";
import {UiGroupModel} from "../../../models/ui-group.model";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";


@Component({
  selector: "course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.less"]
})

export class CourseDetailsComponent implements OnInit {
  @Input() timesheet: UiTimesheetModel;

  public weekDays: string[];
  public groups: UiGroupModel[];
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);


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
