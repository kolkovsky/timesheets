import {GroupModel} from "./group.model";

export class TimesheetModel {
  id: string;
  course: number;
  semester: number;
  date: string;
  groups: GroupModel [];
}
