import {SubjectModel} from "../models/subject.model";
import {WeekDaysConstant} from "../constants/week-days.constant";

export class TimetableUtils {

  private static lessonTimes: any = {
    "9:00": 1,
    "10:30": 2,
    "12:00": 3,
    "13:50": 4,
    "15:20": 5,
    "16:30": 6
  };


  public static sortSubjectsByWeekDay(subjects: any[]): { [key: string]: any[] } {
    return {
      [WeekDaysConstant.WEEK_DAY_MONDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_MONDAY, subjects)],
      [WeekDaysConstant.WEEK_DAY_TUESDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_TUESDAY, subjects)],
      [WeekDaysConstant.WEEK_DAY_WEDNESDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_WEDNESDAY, subjects)],
      [WeekDaysConstant.WEEK_DAY_THURSDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_THURSDAY, subjects)],
      [WeekDaysConstant.WEEK_DAY_FRIDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_FRIDAY, subjects)],
      [WeekDaysConstant.WEEK_DAY_SATURDAY]: [this.getSubjectsByDay(WeekDaysConstant.WEEK_DAY_SATURDAY, subjects)],
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
