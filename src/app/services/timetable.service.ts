import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Time } from "@angular/common";
import { TimesheetModel } from "../models/timesheet.model";

@Injectable()
export class TimetableService {
  private readonly controllerName: string = "/api/v1/ttp-administrator/";

  constructor(private httpClient: HttpClient) {}

  public createTimetableTemplate(template: any): Observable<any> {
    return this.httpClient.post<any>(
      this.controllerName.concat("/time-table/template"),
      template
    );
  }

  public saveTimetable(timesheets: TimesheetModel[]): Observable<void> {
    return this.httpClient.post<void>(
      this.controllerName.concat("/time-table/save"),
      timesheets
    );
  }

  public getTimetable(): Observable<any> {
    return this.httpClient.get<any>(this.controllerName.concat("/time-tables"));
  }
}
