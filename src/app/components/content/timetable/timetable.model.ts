import {TtpComponentInterface} from "../../../interfaces/ttp-component.interface";
import {WeekDaysConstant} from "../../../constants/week-days.constant";
import {TimetableUtils} from "../../../utils/timetable.utils";
import {ScreensEnum} from "../../../constants/screens.enum";
import {Subject} from "rxjs";
import {UiGroupModel} from "../../../models/ui-group.model";
import {GroupModel} from "../../../models/group.model";

export interface ScreenMode {
  screenSize: any;
  largeMode?: boolean;
  mediumMode?: boolean;
  tabletMode?: boolean;
  mobileMode?: boolean;
  smallMode?: boolean;
}

export class TimetableComponentClass implements TtpComponentInterface {

  public weekdays: any[] = WeekDaysConstant.WEEK_DAYS_ARRAY;
  public times: any[] = Object.keys(TimetableUtils.lessonTimes);
  public uiGroup: UiGroupModel;
  public screenMode: ScreenMode;
  public unsubscribeStream$: Subject<void> = new Subject();

  changeScreenMode(screenState: any) {
    if (screenState >= ScreensEnum.large1440px) {
      this.screenMode = {
        screenSize: window.innerWidth,
        largeMode: true
      }
    } else if (screenState >= ScreensEnum.medium1024px && screenState < ScreensEnum.large1440px) {
      this.screenMode = {
        screenSize: window.innerWidth,
        mediumMode: true
      }
    } else if (screenState >= ScreensEnum.tablet768px && screenState < ScreensEnum.medium1024px) {
      this.screenMode = {
        screenSize: window.innerWidth,
        tabletMode: true
      }
    } else if (screenState >= ScreensEnum.mobile425px && screenState < ScreensEnum.tablet768px) {
      this.screenMode = {
        screenSize: window.innerWidth,
        mobileMode: true
      }
    } else if (screenState < ScreensEnum.mobile425px) {
      this.screenMode = {
        screenSize: window.innerWidth,
        smallMode: true
      }
    }
  }

  public processUiGroup(group: GroupModel): any {
    return new UiGroupModel(group.name, TimetableUtils.sortSubjectsByWeekDay(group.subjects));
  }
}
