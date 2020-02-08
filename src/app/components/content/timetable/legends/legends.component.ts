import {Component, Input, OnInit} from "@angular/core";
import {ScreenMode} from "../timetable.model";
import {TimetableUtils} from "../../../../utils/timetable.utils";

@Component({
  selector: "ttp-legends",
  templateUrl: "./legends.component.html",
  styleUrls: ["./legends.component.less"]
})

export class LegendsComponent {

  @Input()
  public screenMode: ScreenMode;

  public lessonTypes: string[] = TimetableUtils.LESSON_TYPE_ARRAY;

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
