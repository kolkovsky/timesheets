import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state.service";
import { TtpGroupButtonComponent } from "src/app/shared/group-button/ttp-group-button.component";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { State } from "src/app/interfaces/state.interface";
import { States } from "src/app/constants/states";
import { TtpFileParsingComponent } from "../parsing/file-parsing.component";

@Component({
  selector: "ttp-header",
  templateUrl: "./header.component.html",
})
export class TtpHeaderComponent extends TtpBaseComponent implements OnInit {
  public visibleEditTimetableButton: boolean;
  public visibleCreateTimetableButton: boolean;
  public visibleAllUploadedFiles: boolean;
  public editModeDisabled: boolean;

  constructor(public stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public turnOnorOffEditMode(): void {
    if (this.editModeDisabled) {
      this.stateService.setStateComponent({
        componentName: TtpGroupButtonComponent.name,
        payload: { stateName: States.showAddButton },
      });
    } else {
      this.stateService.setStateComponent({
        componentName: TtpGroupButtonComponent.name,
        payload: { stateName: States.hideAddButton },
      });
    }
    this.editModeDisabled = !this.editModeDisabled;
  }

  public showAllUploadedFiles(): void {
    this.stateService.setStateComponent({
      componentName: TtpFileParsingComponent.name,
      payload: { stateName: States.showAllUploadedFilesModal },
    });
  }

  public processState(state: State): void {
    const stateName: string = state.payload.stateName;
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
      default:
        break;
    }
  }
}
