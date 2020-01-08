import {SubjectModel} from "../models/subject.model";
import {WeekDaysConstant} from "../constants/week-days.constant";

const LAB: string = "LAB";
const PRACTICE: string = "PRACTICE";
const LECTURE: string = "LECTURE";
const PE: string = "PE";
const SEMINAR: string = "SEMINAR";
const UNDEFINED: string = "UNDEFINED";

export class TimetableUtils {

  public static readonly lessonTypes: any = {
    [LAB]: "Лабораторная",
    [LECTURE]: "Лекция",
    [PRACTICE]: "Практика",
    [PE]: "Физкультура",
    [SEMINAR]: "Семинар",
    [UNDEFINED]: "Что-то интересное"
  };

  public static readonly LAB_RU = "Лабораторная";
  public static readonly LECTURE_RU = "Лекция";
  public static readonly PRACTICE_RU = "Практика";
  public static readonly PE_RU = "Физкультура";
  public static readonly SEMINAR_RU = "Семинар";
  public static readonly OTHER_RU = "Другое";

  public static readonly LESSON_TYPE_ARRAY: string [] = [
    TimetableUtils.LAB_RU, TimetableUtils.LECTURE_RU,
    TimetableUtils.PRACTICE_RU, TimetableUtils.PE_RU,
    TimetableUtils.SEMINAR_RU, TimetableUtils.OTHER_RU
  ];

  public static readonly lessonTimes: any = {
    "9:00": 1,
    "10:30": 2,
    "12:00": 3,
    "13:50": 4,
    "15:20": 5,
    "16:40": 6,
    "17:50": 7
  };

  public static getClassLessonType(lessonType: string): string {
    if (lessonType === LAB || lessonType === TimetableUtils.LAB_RU) {
      return "primary";
    } else if (lessonType === LECTURE || lessonType === TimetableUtils.LECTURE_RU) {
      return "info";
    } else if (lessonType === PRACTICE || lessonType === TimetableUtils.PRACTICE_RU) {
      return "danger";
    } else if (lessonType === PE || lessonType === TimetableUtils.PE_RU) {
      return "warning";
    } else if (lessonType === SEMINAR || lessonType === TimetableUtils.SEMINAR_RU) {
      return "success";
    } else {
      return "default";
    }
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
