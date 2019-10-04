import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminParsingService {

  private controllerName: string = '/api/v1/ttp-administrator';

  constructor(private http: HttpClient) {
  }

  public importFile(file: File): Observable<any> {
    let body = new FormData();
    body.append("file", file);
    return this.http.post<any>(this.controllerName.concat('/time-tables/import'), body);
  }
}

