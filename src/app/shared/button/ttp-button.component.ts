import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModel} from '../../models/button.model';

@Component({
  selector: 'ttp-button',
  templateUrl: './ttp-button.component.html'
})
export class TtpButtonComponent {

  @Input()
  public buttonModel: ButtonModel;

  @Input()
  public clickedButton: boolean = false;

  @Output()
  public clickEvent: EventEmitter<ButtonModel> = new EventEmitter<ButtonModel>();

  public clickOnButton(): void {
    this.clickedButton = true;
    this.clickEvent.emit(this.buttonModel);
  }
}
