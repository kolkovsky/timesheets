import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {PopupService} from "./popup.service";
import {Content} from "./content.model";

const popupConfig = {
  backdrop: false,
  ignoreBackdropClick: false,
};

@Component({
  selector: 'ttp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})

export class PopupComponent implements OnInit {

  @ViewChild('popup', {static: false})
  private popupTemplateRef: TemplateRef<any>;
  private popupModalRef: BsModalRef;
  public notificationContent: Content;
  public showNotification: boolean;

  constructor(private modalService: BsModalService,
              private popupService: PopupService) {
  }

  openModal(popupTemplate: TemplateRef<any>) {
    this.popupModalRef = this.modalService.show(popupTemplate, popupConfig);
  }

  ngOnInit() {
    this.loadNotificationContent();
    this.popupService.notificationState$.subscribe(state => {
      this.showNotification = state;
      this.showNotification ? this.showPopup() : this.closePopup();
    });
  }

  private loadNotificationContent(): void {
    this.popupService.notificationContent$.subscribe(content => {
      this.notificationContent = content;
    })
  }

  public showPopup(): void {
    this.popupModalRef = this.modalService.show(this.popupTemplateRef, popupConfig);
    setTimeout(() => {
      this.closePopup();
    }, 5000);
  }

  public closePopup(): void {
    this.popupModalRef.hide();
  }
}
