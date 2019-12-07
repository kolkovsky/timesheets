import {SubjectModel} from "../models/subject.model";
import {WeekDaysConstant} from "../constants/week-days.constant";
import {ClassesConstant} from "../constants/classes.constant";

const LAB: string = "LAB";
const PRACTICE: string = "PRACTICE";
const LECTURE: string = "LECTURE";
const PE: string = "PE";
const SEMINAR: string = "SEMINAR";

export class TimetableUtils {

  public static readonly lessonType: any = {
    [LAB]: "Лабораторная работа",
    [LECTURE]: "Лекция",
    [PRACTICE]: "Практика",
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
      return this.lab;
    } else if (lessonType === LECTURE) {
      return this.lecture;
    } else if (lessonType === PRACTICE) {
      return this.practice;
    } else if (lessonType === PE) {
      return this.pe;
    } else if (lessonType === SEMINAR) {
      return this.seminar;
    } else {
      return "";
    }
  }

  public static getFormattingLessonType(lessonType: string): string {
    return TimetableUtils.lessonType[Object.keys(TimetableUtils.lessonType).find(type => lessonType === type)];
  }

  public static sortSubjectsByWeekDay(subjects: any[]): { [key: string]: any[] } {
    return {
      [WeekDaysConstant.WEEK_DAY_MONDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_MONDAY, subjects),
      [WeekDaysConstant.WEEK_DAY_TUESDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_TUESDAY, subjects),
      [WeekDaysConstant.WEEK_DAY_WEDNESDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_WEDNESDAY, subjects),
      [WeekDaysConstant.WEEK_DAY_THURSDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_THURSDAY, subjects),
      [WeekDaysConstant.WEEK_DAY_FRIDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_FRIDAY, subjects),
      [WeekDaysConstant.WEEK_DAY_SATURDAY]: this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_SATURDAY, subjects),
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
