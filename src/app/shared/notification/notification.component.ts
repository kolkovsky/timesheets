import { Component, Input, Output , EventEmitter} from "@angular/core";

@Component({
    selector: "ttp-notification",
    templateUrl: "./notification.component.html"
})
export class NotificationComponent {
    @Input()
    public visible: boolean;

    @Input()
    public header: string;

    @Input()
    public description: string;

    @Output()
    public closeNotificationChange: EventEmitter<any> = new EventEmitter<any>();

    public closeNotification(): void {
        this.visible = false;
        this.closeNotificationChange.emit();
    }
}