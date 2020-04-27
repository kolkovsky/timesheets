import { Component } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "ttp-add-timetable",
  templateUrl: "./add-timetable.component.html",
})
export class TtpAddTimetableComponent extends TtpBaseComponent {
  public timetableTemplateCreated: boolean;

  public termFormGroup: FormGroup;
  public courseFormGroup: FormGroup;
  public groupsFormGroup: FormGroup;

  constructor(public stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public processState(state: State): void {}
}
