import {Component, EventEmitter, Input, Output} from "@angular/core";
import {TimetableUtils} from "../../../../utils/timetable.utils";


@Component({
  selector: 'course-details-item',
  templateUrl: "./course-details-item.component.html",
  styleUrls: ["./course-details-item.component.less"]
})

export class CourseDetailsItemComponent{

  @Input() subject: any;
  @Output() replaceEmitter: EventEmitter<void> = new EventEmitter<void>();

  public item;
  public noHover: boolean;

  public getLessonType(lessonType: string): string {
    return TimetableUtils.getformattingLessonType(lessonType);
  }

  public getClassIconForLessonType(lessonType: string): string {
    return TimetableUtils.getClassIconForLessonType(lessonType);
  }

}
