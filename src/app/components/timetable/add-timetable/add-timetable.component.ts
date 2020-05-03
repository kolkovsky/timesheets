import { Component } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModel } from "src/app/models/button.model";
import { UiTimesheetModel } from "src/app/models/ui-timesheet.model";
import { TimetableUtils } from "src/app/utils/timetable.utils";
import { UiGroupModel } from "src/app/models/ui-group.model";
import { TimesheetModel } from "src/app/models/timesheet.model";
import { WeekDaysConstant } from "src/app/constants/week-days.constant";
import { TabHeadingDirective } from "ngx-bootstrap";
import { of } from "rxjs";
import { SubjectModel } from "src/app/models/subject.model";

interface TeacherControl {
  id: string | number;
}

@Component({
  selector: "ttp-add-timetable",
  templateUrl: "./add-timetable.component.html",
})
export class TtpAddTimetableComponent extends TtpBaseComponent {
  public readonly weekdays: string[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public readonly times: string[] = Object.keys(TimetableUtils.lessonTimes);
  public readonly MAX_TEACHERS: number = 3;
  public selectedTableElement: any;

  public termFormGroup: FormGroup;
  public courseFormGroup: FormGroup;
  public groupsFormGroup: FormGroup;
  public subjectFormGroup: FormGroup;
  public teacherSectionControlsIds: string[] = [];

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
  public visibleAddSubjectPopup: boolean;
  public isSubjectFormValid: boolean;
  public visibleAddTeacherButton: boolean = true;

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
    this.subjectFormGroup.statusChanges.subscribe(
      (status) => (this.isSubjectFormValid = "valid" === status.toLowerCase())
    );
    this.initTeacherSectionControlsIds();
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

  public showAddSubjectPopup(tableElement: any): void {
    this.selectedTableElement = tableElement;
    this.visibleAddSubjectPopup = true;
  }

  public addSubject(time: string, day: string): void {
    let subject: SubjectModel = new SubjectModel();
    const controls: { [key: string]: AbstractControl } = this.subjectFormGroup
      .controls;
    Object.keys(this.subjectFormGroup.controls).forEach(
      (controlName: string) => {
        const controlValue: string = controls[controlName].value;
        if (controlName.includes("treacher")) {
          if (!subject.teachers) {
            subject.teachers = [];
          }
          subject.teachers.push(controlValue);
        } else if (controlName.includes("classroom")) {
          if (!subject.classsrooms) {
            subject.classsrooms = [];
          }
          subject.classsrooms.push(controlValue);
        } else {
          subject[controlName] = controlValue;
        }
      }
    );
    subject.time = this.selectedTableElement.time;
    subject.day = this.selectedTableElement.weekday;
    console.log(subject);
    if (!this.selectedUiGroup.sortedSubjects[subject.day]) {
      this.selectedUiGroup.sortedSubjects[subject.day] = [];
    }
    this.selectedUiGroup.sortedSubjects[subject.day].push(subject);
    console.log(this.selectedUiGroup);
    console.log(this.uiTimesheets);
    this.visibleAddSubjectPopup = false;
    this.subjectFormGroup.reset();
  }

  public addTeacherSection(): void {
    this.addTeacherSectionControls(this.subjectFormGroup);
    if (this.teacherSectionControlsIds.length > 2) {
      this.visibleAddTeacherButton = false;
    }
  }

  private initTeacherSectionControlsIds(): void {
    Object.keys(this.subjectFormGroup.controls).forEach((controlName) => {
      if (
        controlName.includes("teacher") ||
        controlName.includes("classroom")
      ) {
        const id: string = controlName
          .replace("teacher", "")
          .replace("classroom", "");
        if (this.teacherSectionControlsIds.length === 0) {
          this.teacherSectionControlsIds.push(id);
        } else {
          if (this.teacherSectionControlsIds.indexOf(id) === -1) {
            this.teacherSectionControlsIds.push(id);
          }
        }
      }
    });
  }

  private addTeacherSectionControls(formGroup: FormGroup) {
    const controls: { [key: string]: AbstractControl } = formGroup.controls;
    let index: string;
    Object.keys(controls).forEach((controlName: string) => {
      if (
        controlName.includes("teacher") ||
        controlName.includes("classroom")
      ) {
        index = controlName.replace("teacher", "").replace("classroom", "");
      }
    });
    formGroup.addControl(
      "teacher" + (parseInt(index) + 1),
      new FormControl("", Validators.compose([Validators.required]))
    );
    formGroup.addControl(
      "classroom" + (parseInt(index) + 1),
      new FormControl("", Validators.compose([Validators.required]))
    );
    this.initTeacherSectionControlsIds();
  }

  public removeTeacher(id: any): void {
    this.subjectFormGroup.removeControl("teacher" + id);
    this.subjectFormGroup.removeControl("classroom" + id);
    this.teacherSectionControlsIds.splice(
      this.teacherSectionControlsIds.indexOf(id),
      1
    );
    if (this.teacherSectionControlsIds.length < 3) {
      this.visibleAddTeacherButton = true;
    }
  }
}
