import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  public notificationContent$: Subject<any> = new Subject();
  public notificationState$: Subject<boolean> = new Subject();

  private setNotificationContent(type: string, closable: boolean, message: string): void {
    this.notificationContent$.next({type: type, closable: closable, message: message});
  }

  public showNotification(type: string, closalbe: boolean, message: string) {
    this.setNotificationContent(type, closalbe, message);
    this.notificationState$.next(true);
  }

  public closeNotification(): void {
    this.notificationState$.next(false);
  }
}
