import {Component, Input} from "@angular/core";

@Component({
  selector: "ttp-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.less"]
})

export class IconComponent {

  @Input() iconName: string;
}
