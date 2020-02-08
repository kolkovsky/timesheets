import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less']
})

export class WelcomePageComponent {

  constructor(private router: Router) {
  }

  public navigateToCoursePage(): void {
    this.router.navigateByUrl('/course');
  }
}
