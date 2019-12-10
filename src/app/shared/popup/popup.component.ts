import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SubjectModel} from "../../models/subject.model";
import {TimetableUtils} from "../../utils/timetable.utils";
import {interval} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: "ttp-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"]
})

/*TODO ADD STYLES FOR POPUP
*  1) make text with rotate function
*   2) Add hide logic with animation
*   3) Add fixed width and height
*   4) Add dark background
*   5) Add <hr> after each text line*/

export class TttPopupComponent implements OnInit {

  @Input()
  public selectedSubject: SubjectModel;

  @Input()
  public visiblePopup: boolean;

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

  private lessonTypes: any = TimetableUtils.lessonTypes;

  public flag: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  public closePopup(): void {
    this.closePopupChange.emit();
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }
}
