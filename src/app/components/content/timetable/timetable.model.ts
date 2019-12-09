import {TtpComponentInterface} from "../../../interfaces/ttp-component.interface";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {ScreensEnum} from "../../../constants/screens.enum";

export class TimetableModel implements TtpComponentInterface {

  private readonly popupViewMode: string = "popup";
  private readonly cardViewMode: string = "card";

  protected weekdays: any [] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  protected times: any[] = Object.keys(TimetableUtils.lessonTimes);
  protected largeModeEnabled;
  protected subjectDetailsViewMode;

  changeScreenMode(screenState: any) {
    this.largeModeEnabled = screenState >= ScreensEnum.large1440px;
    if (this.largeModeEnabled) {
      this.subjectDetailsViewMode = this.cardViewMode;
    } else {
      this.subjectDetailsViewMode = this.popupViewMode;
    }
  }


}
