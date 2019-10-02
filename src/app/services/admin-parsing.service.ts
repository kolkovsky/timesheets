import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminParsingService {
  private ipAddress: string = 'http://192.168.43.139:8080';
  private controllerName: string = '/api/v1/ttp-administrator';

  constructor(private http: HttpClient){}

  public importFile(file: any): Observable<any> {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');

    console.log(this.ipAddress.concat(this.controllerName.concat('/time-tables/import')));
    return this.http.post(this.ipAddress.concat(this.controllerName.concat('/time-tables/import')), file, {
      headers: header
    });
  }
}
