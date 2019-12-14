import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SubjectModel} from "../../models/subject.model";
import {TimetableUtils} from "../../utils/timetable.utils";

@Component({
  selector: "ttp-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"]
})

export class TttPopupComponent implements OnInit {

  @Input()
  public selectedSubject: SubjectModel;

  @Input()
  public visiblePopup: boolean;

  @Input()
  public isMobilePopup: boolean = false;

  @Input()
  set closeWithAnimation(value: boolean) {
    this._closeWithAnimation = value;
  };

  get closeWithAnimation(): boolean {
    return this._closeWithAnimation;
  }

  private _closeWithAnimation: boolean;

  @Output()
  public closePopupChange: EventEmitter<void> = new EventEmitter();

  public lessonTypes: any = TimetableUtils.lessonTypes;
  public flag: boolean = false;

  ngOnInit(): void {
  }

  public closePopup(): void {
    this.closePopupChange.emit();
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
