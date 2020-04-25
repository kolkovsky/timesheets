import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ttp-shared-notification",
  templateUrl: "./notification.component.html",
})
export class TtpNotificationComponent {
  @Input()
  public visible: boolean;

  @Input()
  public text: string;

  @Input()
  public animationType: string = "fadeIdDown";

  @Output()
  public closeNotificationChange: EventEmitter<void> = new EventEmitter<void>();

  public closeNotification(): void {
    this.visible = false;
    this.closeNotificationChange.emit();
  }
}
