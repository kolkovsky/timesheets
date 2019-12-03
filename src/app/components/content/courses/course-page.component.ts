import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from "../../../shared/selector/item.model";
import {TimetableService} from "../../../services/timetable.service";

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less']
})

export class CoursePageComponent implements OnInit {

  public isDisabledButton: boolean = true;
  private selectedCourse: any;
  public availableCourse: Item[];

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private timetableService: TimetableService) {
  }

  ngOnInit(): void {
    this.loadAvailableCourses();
  }

  private loadAvailableCourses(): void {
    this.timetableService.getCourses().subscribe(courses => {
      this.availableCourse = courses.map(course => new Item(course.name, course.id, false));
      console.log(this.availableCourse)
    });
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
