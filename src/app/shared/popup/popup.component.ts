import {Component, OnInit} from '@angular/core';
import {PopupService} from "./popup.service";
import {Content} from "./content.model";
import {popupAnimation} from "./popup.animation";

@Component({
  selector: 'ttp-popup',
  templateUrl: './popup.component.html',
  animations: [popupAnimation]
})
export class PopupComponent implements OnInit {

  public notificationContent: Content;
  private showNotification: boolean = false;

  constructor(private popupService: PopupService) {
  }

  ngOnInit() {
    this.loadNotificationContent();
    this.popupService.notificationState$.subscribe(state => {
      this.showNotification = state;
      if(this.notificationContent) {
        this.showPopup();
      }
    });
  }

  private loadNotificationContent(): void {
    this.popupService.notificationContent$.subscribe(content => {
      this.notificationContent = content;
    })
  }

  public showPopup(): void {
    this.showNotification = true;
    if (this.notificationContent.autoHide) {
      setTimeout(() => {
        this.closePopup();
      }, 5000);
    }
  }

  public closePopup(): void {
    this.showNotification = false;
  }
}
