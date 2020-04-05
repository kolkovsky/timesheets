import {Component, Input} from '@angular/core';

@Component({
  selector: 'ttp-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {

  @Input()
  public iconName: string;

  @Input()
  public customClass: string;

  @Input()
  public customFill: string = "white";
}
