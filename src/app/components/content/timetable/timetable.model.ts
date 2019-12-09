import {TtpComponentInterface} from "../../../interfaces/ttp-component.interface";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {ScreensEnum} from "../../../constants/screens.enum";
import {Subject} from "rxjs";
import {UiGroupModel} from "../../../models/ui-group.model";
import {GroupModel} from "../../../models/group.model";

export class TimetableComponentClass implements TtpComponentInterface {

  protected readonly popupViewMode: string = "popup";
  protected readonly cardViewMode: string = "card";

  protected weekdays: any [] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  protected times: any[] = Object.keys(TimetableUtils.lessonTimes);
  protected lessonTypes: any[] = Object.values(TimetableUtils.lessonTypes);
  protected largeModeEnabled;
  protected subjectDetailsViewMode;
  public unsubscribeStream$: Subject<void> = new Subject();

  changeScreenMode(screenState: any) {
    this.largeModeEnabled = screenState >= ScreensEnum.large1440px;
    if (this.largeModeEnabled) {
      this.subjectDetailsViewMode = this.cardViewMode;
    } else {
      this.subjectDetailsViewMode = this.popupViewMode;
    }
  }

  public getClassForLessonType(lessonType: string): string {
    return TimetableUtils.getClassLessonType(lessonType);
  }

  public processUiGroup(group: GroupModel): any {
    return new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects));
  }

  public getSubjectByTime(time: string, subjects: any): any {
    return subjects ? subjects.find(subject => subject.time === time) : null;
  }
}
