export class SubjectModel {
  id: string;
  name: string;
  teachers: string[];
  time: string;
  day: string;
  classsrooms: string[];
  classLessonType: string;

  public copySubject(subjectModel: SubjectModel): void {
    this.id = subjectModel.id;
    this.name = subjectModel.name;
    this.teachers = subjectModel.teachers;
    this.day = subjectModel.day;
    this.time = subjectModel.time;
    this.classsrooms = subjectModel.classsrooms;
    this.classLessonType = subjectModel.classLessonType;
  }
}
