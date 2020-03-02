import {Component, Input, OnInit} from "@angular/core";
import {UiGroupModel} from 'src/app/models/ui-group.model';
import {TimetableUtils} from "../../../utils/timetable.utils";

@Component({
  selector: "ttp-table",
  templateUrl: "./table.component.html"
})
export class TableComponent implements OnInit {

  @Input()
  public weekdays: string[];

  @Input()
  public times: string[];

  @Input()
  public uiGroup: UiGroupModel;


  ngOnInit(): void {
    console.log(this.uiGroup)
  }

  public getSubjectByTime(time: string, subjects: any): any {
    return subjects ? subjects.find(subject => subject.time === time) : null;
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
