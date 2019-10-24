import {animate, state, style, transition, trigger} from "@angular/animations";

export const cardAnimation =
  trigger('resize', [
    state("on", style({
      "z-index": "100",
      "height": "190px",
      "width": "190px"
    })),
    state("over", style({
      "z-index": "0",
      "height": "175px",
      "width": "175px"
    })),
    state("*", style({
      "z-index": '0',
      "position": "absolute"
    })),
    transition("on => over", [
      animate("0.3s")
    ]),
    transition("over => on", [
      animate("0.3s")
    ]),
    transition('* => on', [
      animate('0.3s'),
    ]),
  ]);
