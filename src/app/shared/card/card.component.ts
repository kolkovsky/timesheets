import {Component, Input, OnInit} from "@angular/core";
import {SubjectModel} from "../../models/subject.model";
import {TimetableUtils} from "../../utils/timetable.utils";

@Component({
  selector: "ttp-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"]
})

export class CardComponent implements  OnInit {

  @Input()
  selectedSubject: SubjectModel;

  @Input()
  visibleCard: boolean = false;

  ngOnInit(): void {
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }

}
