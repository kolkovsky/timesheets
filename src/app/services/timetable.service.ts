import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TimetableService {

  constructor(private httpClient: HttpClient) {
  }

  public getCourses(): Observable<any> {
    return this.httpClient.get("/api/get/courses");
  }

  public getGroupByCourseNumber(): Observable<any> {
    return this.httpClient.get("/api/get/groups")
  }

  public getTimetableByGroup(): Observable<any> {
    return this.httpClient.get("/api/get/timetable");
  }
}
