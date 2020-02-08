import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from "../../../shared/selector/item.model";
import {TimetableService} from "../../../services/timetable.service";
import {Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less']
})

export class CoursePageComponent implements OnInit, OnDestroy {

  public isDisabledButton: boolean = true;
  public availableCourse: Item[];
  public unsubscribeStream$: Subject<void> = new Subject();
  private selectedCourse: any;

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private timetableService: TimetableService) {
  }

  public ngOnInit(): void {
    this.loadAvailableCourses();
  }

  private loadAvailableCourses(): void {
    this.timetableService.getCourses()
      .pipe(
        tap(courses => this.availableCourse = courses.map(course => new Item(course.name, course.id, false))),
        takeUntil(this.unsubscribeStream$))
      .subscribe();
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('/group');
  }

  public courseChange(event) {
    this.selectedCourse = event;
    this.isDisabledButton = false;
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
