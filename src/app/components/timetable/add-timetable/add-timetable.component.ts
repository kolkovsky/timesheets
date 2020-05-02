import { Component } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModel } from "src/app/models/button.model";
import { UiTimesheetModel } from "src/app/models/ui-timesheet.model";
import { TimetableUtils } from "src/app/utils/timetable.utils";
import { UiGroupModel } from "src/app/models/ui-group.model";
import { TimesheetModel } from "src/app/models/timesheet.model";
import { WeekDaysConstant } from "src/app/constants/week-days.constant";

@Component({
  selector: "ttp-add-timetable",
  templateUrl: "./add-timetable.component.html",
})
export class TtpAddTimetableComponent extends TtpBaseComponent {
  public readonly weekdays: string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public readonly times: string[] = Object.keys(TimetableUtils.lessonTimes);

  public termFormGroup: FormGroup;
  public courseFormGroup: FormGroup;
  public groupsFormGroup: FormGroup;
  public subjectFormGroup: FormGroup;

  public readonly labelForCourse: string =
    "Здесь еще нет учебных курсов. Нажмите, чтобы добавить ";

  public readonly labelForGroup: string =
    "Здесь еще нет учебных групп. Нажмите, что добавить";

  public courseLabel: string = this.labelForCourse;
  public groupLabel: string = this.labelForGroup;

  //new courses
  public selectedCourse: string;
  public selectedUiCourse: UiTimesheetModel;
  public uiTimesheets: UiTimesheetModel[] = [];
  public courseItems: ButtonModel[] = [];
  //new groups
  public selectedGroup: string;
  public selectedUiGroup: UiGroupModel;
  public groupItems: ButtonModel[] = [];

  //flags
  public visibleAddCoursePopup: boolean;
  public isCourseFormValid: boolean;
  public visibleAddGroupForCourse: boolean;
  public isGroupFormValid: boolean;
  public visibleAddSubjectPopup: boolean = true;
  public isSubjectFormValid: boolean;

  constructor(public stateService: StateService, private router: Router) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    //**It's not secure method but don't remove it*/
    if (!localStorage.getItem("timetable")) {
      this.router.navigateByUrl("/home");
    }

    this.courseFormGroup = new FormGroup({
      course: new FormControl("", Validators.compose([Validators.required])),
    });
    this.courseFormGroup.statusChanges.subscribe(
      (status) => (this.isCourseFormValid = "valid" === status.toLowerCase())
    );
    this.groupsFormGroup = new FormGroup({
      group: new FormControl("", Validators.compose([Validators.required])),
    });
    this.groupsFormGroup.statusChanges.subscribe(
      (status) => (this.isGroupFormValid = "valid" === status.toLowerCase())
    );

    this.subjectFormGroup = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      teacher1: new FormControl("", Validators.compose([Validators.required])),
      classLessonType: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      classroom1: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  public processState(state: State): void {}

  public showAddCoursePopup(): void {
    this.visibleAddCoursePopup = true;
  }

  public addCourse(): void {
    const addedCourse: string = this.courseFormGroup.controls["course"].value;
    this.uiTimesheets.push(
      new UiTimesheetModel(Number.parseInt(addedCourse), [])
    );
    this.courseItems.unshift(new ButtonModel(addedCourse, false));
    this.courseFormGroup.reset();
    this.courseLabel = undefined;
    this.visibleAddCoursePopup = false;
  }

  public selectCourse(course: ButtonModel): void {
    this.selectedCourse = course.label;
    this.selectedUiGroup = undefined;
    const uiTimesheetFounded: UiTimesheetModel = this.uiTimesheets.find(
      (uiTimesheet: UiTimesheetModel) =>
        uiTimesheet.course.toString() === this.selectedCourse
    );
    this.selectedUiCourse = uiTimesheetFounded;
    if (
      uiTimesheetFounded.uiGroups ||
      uiTimesheetFounded.uiGroups.length !== 0
    ) {
      this.groupItems = uiTimesheetFounded.uiGroups.map(
        (uiGroup: UiGroupModel) => new ButtonModel(uiGroup.name, false)
      );
    } else {
      this.groupItems = [];
    }
    this.groupItems.push(this.getEditButton());
  }

  private getEditButton(): ButtonModel {
    return {
      id: "add",
      isHasIcon: true,
      iconName: "plus-small",
    } as ButtonModel;
  }

  public showAddGroupPopup(): void {
    this.visibleAddGroupForCourse = true;
  }

  public addGroup(): void {
    const addedGroup: string = this.groupsFormGroup.controls["group"].value;
    const uiTimesheetFounded: UiTimesheetModel = this.uiTimesheets.find(
      (uiTimesheet) => uiTimesheet.course.toString() === this.selectedCourse
    );
    uiTimesheetFounded.uiGroups.push(new UiGroupModel(addedGroup, []));
    this.groupItems.unshift(new ButtonModel(addedGroup, false));
    this.groupsFormGroup.reset();
    this.groupLabel = undefined;
    this.visibleAddGroupForCourse = false;
  }

  public selectGroup(group: ButtonModel): void {
    this.selectedGroup = group.label;
    this.selectedUiGroup = this.selectedUiCourse.uiGroups.find(
      (uiGroup) => uiGroup.name === this.selectedGroup
    );
  }

  public showAddSubjectPopup(subject: any): void {
    console.log(subject);
    this.visibleAddSubjectPopup = true;
  }

  public addSubject(): void {}
}
