import {SubjectModel} from "../models/subject.model";
import {WeekDaysConstant} from "../constants/week-days.constant";
import {ClassesConstant} from "../constants/classes.constant";
import {UiSubjectModel} from "../models/ui-subject.model";
import {element} from "protractor";

const LAB: string = "LAB";
const PRACTICE: string = "PRACTICE";
const LECTURE: string = "LECTURE";
const PE: string = "PE";
const SEMINAR: string = "SEMINAR";

export class TimetableUtils {

  public static readonly lessonTypes: any = {
    [LAB]: "Лабораторная",
    [LECTURE]: "Лекция",
    [PRACTICE]: "Практика",
    [PE]: "Физкультура",
    [SEMINAR]: "Семинар"
  };

  public static readonly lab = "lab";
  public static readonly lecture = "lecture";
  public static readonly practice = "practice";
  public static readonly seminar = "seminar";
  public static readonly pe = "pe";

  public static readonly lessonTimes: any = {
    "9:00": 1,
    "10:30": 2,
    "12:00": 3,
    "13:50": 4,
    "15:20": 5,
    "16:40": 6,
    "17:50": 7
  };

  public static getClassIconForLessonType(lessonType: string): string {
    return LAB === lessonType ? ClassesConstant.beakerIconClass :
      LECTURE === lessonType ? ClassesConstant.megaphoneIconClass :
        PRACTICE === lessonType ? ClassesConstant.pencilIconClass :
          PE === lessonType ? ClassesConstant.flameIconClass : "";
  }

  public static getClassLessonType(lessonType: string): string {
    if (lessonType === LAB) {
      return "primary";
    } else if (lessonType === LECTURE) {
      return "info";
    } else if (lessonType === PRACTICE) {
      return "danger";
    } else if (lessonType === PE) {
      return "warning";
    } else if (lessonType === SEMINAR) {
      return "success";
    } else {
      return "";
    }
  }

  public static getFormattingLessonType(lessonType: string): string {
    return TimetableUtils.lessonTypes[Object.keys(TimetableUtils.lessonTypes).find(type => lessonType === type)];
  }

  public static sortSubjectsByWeekDay(subjects: any[]): { [key: string]: any[] } {
    return {
      [WeekDaysConstant.WEEK_DAY_MONDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_MONDAY_RU, subjects),
      [WeekDaysConstant.WEEK_DAY_TUESDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_TUESDAY_RU, subjects),
      [WeekDaysConstant.WEEK_DAY_WEDNESDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_WEDNESDAY_RU, subjects),
      [WeekDaysConstant.WEEK_DAY_THURSDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_THURSDAY_RU, subjects),
      [WeekDaysConstant.WEEK_DAY_FRIDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_FRIDAY_RU, subjects),
      [WeekDaysConstant.WEEK_DAY_SATURDAY_RU]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_SATURDAY_RU, subjects),
    };
  }

  private static getSubjectsByDay(day: string, subjects: SubjectModel[]): SubjectModel[] {
    return subjects.filter(subject => subject.day.toLowerCase() === day.toLowerCase()).sort(this.compareToTime);
  }

  private static compareToTime(subject1: SubjectModel, subject2: SubjectModel): number {
    return TimetableUtils.lessonTimes[subject1.day] < TimetableUtils.lessonTimes[subject2.day] ? 1 :
      TimetableUtils.lessonTimes[subject1.day] > TimetableUtils.lessonTimes[subject2.day] ? -1 : 0;
  }
}
