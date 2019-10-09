import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

export const popupAnimation =
  trigger('showHide', [
    state("show", style({
      "visibility": "visible",
      "opacity": "1",
      "margin-top": "150px"
    })),
    state("hide", style({
      "visibility": "hidden",
      "opacity": "0.2",
      "margin-top": "0px"
    })),
    state("*", style({
      opacity: '0.1',
      "margin-top": "0px",
      "visibility": "visible"
    })),
    transition("show => hide", [
      animate("1s")
    ]),
    transition("hide => show", [
      animate("1s")
    ]),
    transition ('* => show', [
      animate ('1s'),
    ]),
  ]);

