import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";

@Injectable()
export class TimetableService {
  constructor(private httpClient: HttpClient) {}

  public getTimetable(): Observable<any> {
    return this.httpClient.get<any>("/api/get/timetable");
  }
}
