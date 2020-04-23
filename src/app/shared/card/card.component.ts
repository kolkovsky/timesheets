import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "ttp-shared-card",
  templateUrl: "./card.component.html",
})
export class CardComponent {
  @Input()
  public iconName: string;
  @Input()
  public headerText: string;
  @Input()
  public description: string;
  @Input()
  public buttonName: string;
  @Output()
  public navigateChange: EventEmitter<void> = new EventEmitter();

  public clickHandler(): void {
    this.navigateChange.emit();
  }
}
