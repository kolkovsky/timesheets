import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModel} from '../../models/button.model';

@Component({
  selector: 'ttp-group-button',
  templateUrl: './ttp-group-button.component.html',
  styleUrls: ['./ttp-group-button.component.less']
})
export class TtpGroupButtonComponent {
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

  public chooseElement(item: ButtonModel): void {
    this.items.find((button: ButtonModel) => button.clicked = false);
    const clickedButton = this.items.find((button: ButtonModel) => button.clicked = (button.label.toLowerCase() === item.label.toLowerCase()));
    this.buttonClickChange.emit(clickedButton);
  }
}
