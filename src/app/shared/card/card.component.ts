import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "ttp-shared-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"]
})

export class CardComponent implements OnInit {

  @Input() cardContent: string;


  ngOnInit(): void {

  }


}
