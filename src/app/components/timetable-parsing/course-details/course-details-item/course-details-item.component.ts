import {Component, Input} from "@angular/core";
import {TimetableUtils} from "../../../../utils/timetable.utils";

@Component({
  selector: 'course-details-item',
  templateUrl: "./course-details-item.component.html",
  styleUrls: ["./course-details-item.component.less"]
})

export class CourseDetailsItemComponent{

  @Input() subject: any;

  public item;
  public noHover: boolean;

  public getLessonType(lessonType: string): string {
    return TimetableUtils.getformattingLessonType(lessonType);
  }

  public getClassIconForLessonType(lessonType: string): string {
    return TimetableUtils.getClassIconForLessonType(lessonType);
  }


  public replaceItem(event: any, item: HTMLElement): void {
    console.log(item);
    this.item = item;
    this.item.style.position = "absolute";
    this.item.style.zIndex = "1000";
    this.noHover = true;
    this.item.ondragstart = function () {
      return false;
    };

    this.moveAt(event.pageX, event.pageY);

    document.body.addEventListener("mousemove", ev => {
      this.moveAt(ev.pageX, ev.pageY);
    });
  }

  public mouseUpChange(event): void {
    document.removeEventListener("mousemove", ()=>{});
  }


  public moveAt(pageX, pageY): void {
    this.item.style.left = pageX - this.item.offsetWidth / 2 + 'px';
    this.item.style.top = pageY - this.item.offsetHeight / 2 + 'px';
  }


}
