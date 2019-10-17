import {UiGroupModel} from "./ui-group.model";

export class UiTimesheetModel {
  course: number;
  uiGroups: UiGroupModel[];

  constructor(course: number, uiGroups: UiGroupModel[]) {
    this.course = course;
    this.uiGroups = uiGroups;
  }
}
