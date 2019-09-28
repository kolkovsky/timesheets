import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less']
})

export class CoursePageComponent {

  public isDisabledButton: boolean = true;

  constructor(private router: Router) {
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('/group');
  }

  public courseChange(event) {
    this.isDisabledButton = true;
  }
}
