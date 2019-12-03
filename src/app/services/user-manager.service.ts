import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserManagerService {

  public welcomePageUrl: string = "/welcome";
  public choosenCourseSubject: Subject<any> = new Subject<any>();
  public choosenGroupSubject: Subject<any> = new Subject<any>();


  public setUserCourseValue(value: string): void {
    localStorage.setItem("course", value);
  }

  public setUserGroupValue(value: string): void {
    localStorage.setItem("group", value);
  }

}
