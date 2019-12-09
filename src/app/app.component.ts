import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from './app.animation';
import {StateService} from "./services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent {

  constructor(private stateService: StateService) {
  }

  @HostListener('window:resize', ['$event']) resizeScreenEvent(): void {
    this.stateService.setScreenState(window.innerWidth);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
