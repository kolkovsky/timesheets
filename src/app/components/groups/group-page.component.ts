import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'group-page',
  templateUrl: 'group-page.component.html',
  styleUrls: ['./group-page.component.less']
})

export class GroupPageComponent {
  constructor(private router: Router) {
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('timetable');
  }
}
