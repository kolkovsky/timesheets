import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";


export interface PopupDetails {
  leftSideHeader: any;
  rightSideContent: any;
  closable?: boolean;
}

@Component({
  selector: "ttp-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"]
})

export class TttPopupComponent implements OnInit{

  @Input()
  public popupDetails: PopupDetails;

  @Input()
  public visiblePopup: boolean;

  @Output()
  public closePopupChange: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.popupDetails)
  }

  public closePopup(): void {
    this.closePopupChange.emit();
  }
}
