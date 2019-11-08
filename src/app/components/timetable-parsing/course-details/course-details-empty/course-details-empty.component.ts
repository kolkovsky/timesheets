import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: "course-details-empty",
  templateUrl: "./course-details-empty.component.html",
  styleUrls: ["./course-details-empty.component.less"]
})

export class CourseDetailsEmptyComponent {


  @Output()
  public dropEventChange: EventEmitter<void> = new EventEmitter();

  public dropHandler(event: any): void {
    this.dropEventChange.emit();
  }
}
