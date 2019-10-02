import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less']
})

export class CoursePageComponent {

  public isDisabledButton: boolean = true;
  private selectedCourse: any;
  public items: any[] = [
    {value: '', selected: true},
    {value: '1', selected: false},
    {value: '2', selected: false},
    {value: '3', selected: false}
  ];

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('/group');
  }

  public courseChange(event) {
    this.selectedCourse = event;
    this.isDisabledButton = false;
    this.changeDetectorRef.detectChanges();
  }
}
