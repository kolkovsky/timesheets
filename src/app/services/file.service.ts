import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpProgressEvent,
  HttpEventType,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FileService {
  private controllerName: string = "/api/v1/ttp-administrator";
  public importData$: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: HttpClient) {}

  public importFile(file: File): Observable<any> {
    let body = new FormData();
    body.append("file", file);
    return this.http
      .post<any>(this.controllerName.concat("/time-tables/import"), body)
      .pipe(tap((data) => this.importData$.next(data)));
  }

  public getAllUploadedFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.controllerName.concat("/uploaded-files"));
  }
}
