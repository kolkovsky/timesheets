import {Component, Input, OnInit} from "@angular/core";
import {ScreenMode} from "../timetable.model";
import {TimetableUtils} from "../../../../utils/timetable.utils";

@Component({
  selector: "ttp-legends",
  templateUrl: "./legends.component.html",
  styleUrls: ["./legends.component.less"]
})

export class LegendsComponent implements OnInit {

  @Input()
  public screenMode: ScreenMode;

  public lessonTypes: string[] = TimetableUtils.LESSON_TYPE_ARRAY;

  ngOnInit(): void {
  }

  public getClassForLessonType(lessonType: string): string {
    console.log(lessonType)
    console.log(TimetableUtils.getClassLessonType(lessonType));
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
