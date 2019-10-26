import {Component, ComponentFactory, ComponentFactoryResolver, HostListener, Input, OnInit} from "@angular/core";
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

  private subject: any;
  public item: any;
  public noHover: boolean;
  private smallModeView: boolean = false;
  public weekDays: string[];
  public groups: UiGroupModel[];
  public times: string[] = Object.keys(TimetableUtils.lessonTimes);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  constructor(private componentFactoryRes: ComponentFactoryResolver){

  }

  ngOnInit(): void {

    this.checkWindowSize();
    this.weekDays = WeekDaysConstant.WEEK_DAYS_ARRAY;
    this.loadGroupsForTimesheet();
  }


  public getSubjectByTime(time: string, subjects: any): any {
    return this.subject = subjects.find(subject => subject.time === time);
  }

  private checkWindowSize(): void {
    this.smallModeView = innerWidth < 1360;
  }

  public loadGroupsForTimesheet(): void {
    if (this.timesheet) {
      this.groups = this.timesheet.uiGroups;
    }
  }

}
