import { Component, Input, EventEmitter, Output } from "@angular/core";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";

@Component({
  selector: "ttp-shared-popup",
  templateUrl: "./popup.component.html",
})
export class TtpPopupComponent extends TtpBaseComponent {
  @Input()
  public visiblePopup: boolean = false;
  @Input()
  public position: string = "center";
  @Input()
  public header: string;
  @Input()
  public description: string;
  @Input()
  public visibleCloseButton: boolean;

  @Output()
  public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public processState(state: State): void {}

  public closePopup(): void {
    this.visiblePopup = false;
    this.visibleChange.emit(this.visiblePopup);
  }
}
