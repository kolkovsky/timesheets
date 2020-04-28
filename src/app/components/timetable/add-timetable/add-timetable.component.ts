import { Component } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModel } from "src/app/models/button.model";

@Component({
  selector: "ttp-add-timetable",
  templateUrl: "./add-timetable.component.html",
})
export class TtpAddTimetableComponent extends TtpBaseComponent {
  public timetableTemplateCreated: boolean;

  public termFormGroup: FormGroup;
  public courseFormGroup: FormGroup;
  public groupsFormGroup: FormGroup;

  public courseLabel: string =
    "Здесь еще нет учебных курсов. Нажмите, чтобы добавить ";
  public groupLabel: string =
    "Здесь еще нет учебных групп. Нажмите, что добавить";

  //new courses
  public courseItems: ButtonModel[] = [];
  //new groups
  public groupItems: ButtonModel[] = [];

  //flags
  public visibleAddCoursePopup: boolean;
  public isCourseFormValid: boolean;

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
  }

  public processState(state: State): void {}

  public showAddCoursePopup(): void {
    this.visibleAddCoursePopup = true;
  }

  public addCourse(): void {
    const addedCourse: string = this.courseFormGroup.controls["course"].value;
    this.courseItems.unshift(new ButtonModel(addedCourse, false));
    this.courseLabel = undefined;
    this.visibleAddCoursePopup = false;
  }

  public addGroup(): void {}
}
