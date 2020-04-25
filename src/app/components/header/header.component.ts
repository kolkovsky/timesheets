import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state.service";
import { TtpGroupButtonComponent } from "src/app/shared/group-button/ttp-group-button.component";

@Component({
  selector: "ttp-header",
  templateUrl: "./header.component.html",
})
export class TtpHeaderComponent implements OnInit {
  public visibleEditTimetableButton: boolean = true;
  public visibleAddTimetableButton: boolean = true;
  public editModeDisabled: boolean = true;

  constructor(private stateService: StateService) {}

  public ngOnInit(): void {}

  public turnOnorOffEditMode(): void {
    if (this.editModeDisabled) {
      this.stateService.setStateComponent({
        componentName: TtpGroupButtonComponent.name,
        payload: { stateName: "showAddButton" },
      });
    } else {
      this.stateService.setStateComponent({
        componentName: TtpGroupButtonComponent.name,
        payload: { stateName: "hideAddButton" },
      });
    }
    this.editModeDisabled = !this.editModeDisabled;
  }
}
