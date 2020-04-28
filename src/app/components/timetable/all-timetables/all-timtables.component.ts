import { Component } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";

@Component({
  selector: "ttp-all-timetables",
  templateUrl: "./all-timetables.component.html",
})
export class TtpAllTimetablesComponent extends TtpBaseComponent {
  constructor(public stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public processState(state: State): void {}
}
