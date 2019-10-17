export class UiGroupModel {
  name: string;
  sortedSubjects: any;

  constructor(name: string, sortedSubjects) {
    this.name = name;
    this.sortedSubjects = sortedSubjects;
  }
}
