import {state, style, trigger} from "@angular/animations";


export const PopupAnimation = trigger("flipAnimation", [
  state("show", style({
    "opacity" : 1
  })),
  state("toShow", style({
    "opacity": "1",
    "transform": "rotateY(-60deg)"
  })),
  state("toHide", style({
  }))
]);
