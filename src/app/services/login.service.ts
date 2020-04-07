import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient){}

    public sendLoginRequest(login: string, password: string): Observable<any> {
        return this.httpClient.post<any>("/api/login", {login: login, password: password});
    }
}