import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SubjectModel} from "../../models/subject.model";

@Component({
  selector: "ttp-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"]
})

/*TODO ADD STYLES FOR POPUP
*  1) make text with rotate function
*   2) Add hide logic with animation
*   3) Add fixed width and height
*   4) Add dark background
*   5) Add <hr> after each text line*/

export class TttPopupComponent implements OnInit{

  @Input()
  public selectedSubject: SubjectModel;

  @Input()
  public visiblePopup: boolean;

  @Output()
  public closePopupChange: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }

  public closePopup(): void {
    this.closePopupChange.emit();
  }
}
