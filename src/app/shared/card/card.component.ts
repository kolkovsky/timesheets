import {Component, HostListener, Input, OnInit} from "@angular/core";
import {cardAnimation} from "./card.animation";

@Component({
  selector: "ttp-shared-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
  animations: [cardAnimation]
})

export class CardComponent implements OnInit {

  @Input() cardContent: string;

  public show: boolean;

  @HostListener('mouseover')
  catchMouseOver() {
    console.log("mouseover");
    this.show = true;
  }

  @HostListener('mouseout')
  catchMouseOut() {
    console.log("mouseout");
    this.show = false;
  }

  ngOnInit(): void {

  }


}
