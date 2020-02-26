import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModel} from '../../models/button.model';
import {StateInterface} from '../../interfaces/state.interface';
import {StateService} from '../../services/state.service';
import {TtpBaseComponent} from '../../ng-core/ttp-base.component';

@Component({
  selector: 'ttp-group-button',
  templateUrl: './ttp-group-button.component.html',
  styleUrls: ['./ttp-group-button.component.less']
})
export class TtpGroupButtonComponent extends TtpBaseComponent {
  @Input()
  public items: ButtonModel[];

  @Input()
  public color: string = 'danger';

  @Input()
  public backgroundColor: string = '#100e3d';

  @Input()
  public title: string;

  @Output()
  public buttonClickChange: EventEmitter<ButtonModel> = new EventEmitter<ButtonModel>();

  public buttonClass: string = 'btn-' + this.color;
  public buttonOutlineClass: string = 'btn-outline-' + this.color;

  constructor(protected stateService: StateService) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public processState(state: StateInterface): void {
    console.log(state);
  }

  public chooseElement(item: ButtonModel): void {
    this.items.find((button: ButtonModel) => button.clicked = false);
    const clickedButton = this.items.find((button: ButtonModel) => button.clicked = (button.label.toLowerCase() === item.label.toLowerCase()));
    this.stateService.setStateComponent({
      componentName: TtpGroupButtonComponent.name,
      payload: {clickedButton: clickedButton}
    });
    this.buttonClickChange.emit(clickedButton);
  }
}
