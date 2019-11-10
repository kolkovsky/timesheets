import {Component, Input} from "@angular/core";

@Component({
  selector: "card-comp",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"]
})

export class CardComponent {
  @Input()
  public content: any;

}


