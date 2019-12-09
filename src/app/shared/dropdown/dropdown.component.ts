import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "ttp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.less"]
})

export class DropdownComponent {

  @Input()
  public selectedItem: string;

  @Input()
  public dropdownItems: string[];

  @Input()
  public backgroundColor: string = "primary";

  @Output()
  public dropdownItemChange: EventEmitter<any> = new EventEmitter();

  public changeDropdownItem(item): void {
    this.selectedItem = item;
    this.dropdownItemChange.emit(item)
  }
}
