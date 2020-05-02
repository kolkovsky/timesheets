import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { UiGroupModel } from "src/app/models/ui-group.model";
import { TimetableUtils } from "../../../utils/timetable.utils";

@Component({
  selector: "ttp-table",
  templateUrl: "./table.component.html",
})
export class TableComponent {
  @Input()
  public weekdays: string[];

  @Input()
  public times: string[];

  @Input()
  public uiGroup: UiGroupModel;

  @Input()
  public editModeEnabled: boolean;

  @Output()
  public clickOnEmptyElement: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public clickOnElement: EventEmitter<any> = new EventEmitter<any>();

  public getSubjectByTime(time: string, subjects: any): any {
    return subjects ? subjects.find((subject) => subject.time === time) : null;
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
