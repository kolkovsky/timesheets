import { Component, Input } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";

@Component({
  selector: "ttp-shared-dropdown",
  templateUrl: "./dropdown.component.html",
})
export class TtpDropdownComponent extends TtpBaseComponent {
  @Input()
  public items: any[];

  constructor(public stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public processState(state: State): void {}
}
