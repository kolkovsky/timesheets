import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {UiGroupModel} from "../../../../models/ui-group.model";
import {TimetableUtils} from "../../../../utils/timetable.utils";
import {ScreenMode} from "../timetable.model";
import {SubjectModel} from "../../../../models/subject.model";
import {SystemsConstant} from "../../../../constants/systems.constant";

export interface SubjectDetailsEvent {
  viewMode: string;
  subject: SubjectModel
}

@Component({
  selector: "ttp-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"]
})

export class TableComponent implements OnInit {

  @Input()
  public weekdays: string[];

  @Input()
  public times: string[];

  @Input()
  public uiGroup: UiGroupModel;

  @Input()
  public screenMode: ScreenMode;

  @Output()
  public openSubjectDetailsChange: EventEmitter<SubjectDetailsEvent> = new EventEmitter<SubjectDetailsEvent>();


  ngOnInit(): void {
  }

  public openSubjectDetails(subject: any): void {
    if (this.screenMode.largeMode) {
      this.openSubjectDetailsChange.emit({
        viewMode: SystemsConstant.CARD_VIEW_MODE,
        subject: subject
      });
    } else {
      this.openSubjectDetailsChange.emit({
        viewMode: SystemsConstant.POPUP_VIEW_MODE,
        subject: subject
      });
    }
  }

  public getSubjectByTime(time: string, subjects: any): any {
    return subjects ? subjects.find(subject => subject.time === time) : null;
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
