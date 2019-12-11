import {Component, Input} from "@angular/core";

// @ts-ignore
@Component({
  selector: "weekday-details",
  templateUrl: "./weekday-details.component.html",
  styleUrls: ["./weekday-details.component.less"]
})
export class WeekdayDetailsComponent {

  @Input()
  public visibleSubjectDetails: boolean;
}
