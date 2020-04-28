import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

  public getTimetable(): Observable<any> {
    return this.httpClient.get<any>(this.controllerName.concat("/time-tables"));
  }
}
