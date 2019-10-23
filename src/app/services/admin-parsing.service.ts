import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {TimetableModel} from "../models/timetable.model";


@Injectable({
  providedIn: 'root'
})

export class AdminParsingService {

  private controllerName: string = '/api/v1/ttp-administrator';
  public importData$: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: HttpClient) {
  }

  public importFile(file: File): Observable<any> {
    let body = new FormData();
    body.append("file", file);
    return this.http.post<any>(this.controllerName.concat('/time-tables/import'), body);
  }
}

