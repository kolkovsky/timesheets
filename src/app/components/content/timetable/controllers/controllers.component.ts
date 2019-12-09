import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ScreenMode} from "../timetable.model";

export interface ControllerState {
  selectedTime?: string;
  selectedLessonType?: string;
  selectedWeekDay?: string;
}


@Component({
  selector: "ttp-controllers",
  templateUrl: "./controllers.component.html",
  styleUrls: ["./controllers.component.less"]
})

export class ControllersComponent implements OnInit {

  @Input()
  public weekdays: string[];

  @Input()
  public times: string[];

  @Input()
  public lessonTypes: string[];

  @Input()
  public selectedTime: string;

  @Input()
  public selectedLessonType: string;

  @Input()
  public selectedWeekDay: string;

  @Input()
  public screenMode: ScreenMode;

  @Output()
  public controllerStateChange: EventEmitter<ControllerState> = new EventEmitter<ControllerState>();

  ngOnInit(): void {
    //todo Make this value by default selected
  }

  public changeTime(event) {
    this.selectedTime = event;
    this.controllerStateChange.emit({selectedTime: this.selectedTime});
  }

  public changeLessonType(event) {
    this.selectedLessonType = event;
    this.controllerStateChange.emit({selectedLessonType: this.selectedLessonType});
  }

  public changeWeekday(event) {
    this.selectedWeekDay = event;
    this.controllerStateChange.emit({selectedWeekDay: this.selectedWeekDay});
  }
}
