import { SubjectModel } from "./subject.model";

export class UiGroupModel {
  id: string;
  name: string;
  sortedSubjects: { [key: string]: SubjectModel[] };

  constructor(name: string, sortedSubjects) {
    this.name = name;
    this.sortedSubjects = sortedSubjects;
  }
}
