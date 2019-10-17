import {GroupModel} from "./group.model";

export class TimesheetModel {
  course: number;
  semester: number;
  date: string;
  groups: GroupModel [];
}
