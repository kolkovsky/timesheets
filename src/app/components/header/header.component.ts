import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state.service";
import { TtpGroupButtonComponent } from "src/app/shared/group-button/ttp-group-button.component";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { State } from "src/app/interfaces/state.interface";
import { States } from "src/app/constants/states";
import { TtpFileParsingComponent } from "../parsing/file-parsing.component";
import { Router } from "@angular/router";
import { TimetableService } from "src/app/services/timetable.service";
import { tap, finalize, catchError } from "rxjs/operators";
import { LoaderService } from "src/app/services/loader.service";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { TimesheetModel } from "src/app/models/timesheet.model";

@Component({
  selector: "ttp-header",
  templateUrl: "./header.component.html",
})
export class TtpHeaderComponent extends TtpBaseComponent implements OnInit {
  public visibleEditTimetableButton: boolean;
  public visibleCreateTimetableButton: boolean;
  public visibleAllUploadedFiles: boolean;
  public visibleSaveTimetableButton: boolean;
  public editModeEnabled: boolean;
  public links: any[];
  public visibleAddTimetablePopup: boolean;

  constructor(
    public stateService: StateService,
    private router: Router,
    private timetableService: TimetableService,
    private loaderService: LoaderService
  ) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public turnOnEditMode(): void {
    this.stateService.setStateComponent({
      componentName: TtpGroupButtonComponent.name,
      payload: { stateName: States.showAddButton },
    });
    this.editModeEnabled = true;
  }

  public turnOffEditMode(): void {
    this.stateService.setStateComponent({
      componentName: TtpGroupButtonComponent.name,
      payload: { stateName: States.hideAddButton },
    });
    this.editModeEnabled = false;
  }

  public saveTimetable(): void {
    const timesheets: any[] = JSON.parse(localStorage.getItem("timesheets"));
    this.timetableService.saveTimetable(timesheets).subscribe(() => {
      console.log("success");
    });
  }

  public showAddingTimetablePopup(): void {
    this.visibleAddTimetablePopup = true;
  }

  public goToTimetableDetails(): void {
    /*It's stub-object, because we need implement validators
    https://trello.com/c/l9sZPJPz/15-create-validatior-for-create-timetable-template-form
    */
    const object: any = {
      start: 2019,
      end: 2020,
    };
    this.loaderService.showLoader("Создание шаблона");
    this.timetableService.createTimetableTemplate(object).pipe(
      tap((response) => {
        localStorage.setItem("timetable", JSON.stringify(response));
      }),
      catchError((error: HttpErrorResponse) => {
        //todo: show notification
        return of(null);
      }),
      finalize(() => this.loaderService.hideSpinner())
    );

    this.visibleAddTimetablePopup = false;
    this.visibleCreateTimetableButton = false;
    this.router.navigateByUrl("/timetable-details");
  }

  public showAllUploadedFiles(): void {
    this.stateService.setStateComponent({
      componentName: TtpFileParsingComponent.name,
      payload: { stateName: States.showAllUploadedFilesModal },
    });
  }

  public processState(state: State): void {
    const stateName: string = state.payload.stateName;
    const stateValue: any = state.payload.value;
    switch (stateName) {
      case States.showCreateTimetableButton:
        this.visibleCreateTimetableButton = true;
        break;
      case States.hideCreateTimetableButton:
        this.visibleCreateTimetableButton = false;
        break;
      case States.showEditTimetableButton:
        this.visibleEditTimetableButton = true;
        break;
      case States.hideEditTimtableButton:
        this.visibleEditTimetableButton = false;
        break;
      case States.showAllUploadedFilesButton:
        this.visibleAllUploadedFiles = true;
        break;
      case States.hideAllUploadedFilesButton:
        this.visibleAllUploadedFiles = false;
        break;
      case States.headerLinksChange:
        this.links = state.payload.value;
        break;
      case States.visibleSaveTimetableButton:
        this.visibleSaveTimetableButton = stateValue;
        break;
      default:
        break;
    }
  }
}
