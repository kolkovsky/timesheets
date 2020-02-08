import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from "../../../shared/selector/item.model";
import {TimetableService} from "../../../services/timetable.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'group-page',
  templateUrl: 'group-page.component.html',
  styleUrls: ['./group-page.component.less']
})

export class GroupPageComponent implements OnInit, OnDestroy {

  public isDisableButton: boolean = true;
  private selectedGroup: any;
  public availableGroups: Item[];
  public unsubscribeStream$: Subject<void> = new Subject();

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private timetableService: TimetableService) {
  }

  ngOnInit(): void {
    this.loadAvailableGroups();
  }

  private loadAvailableGroups(): void {
    this.timetableService.getGroupByCourseNumber()
      .pipe(tap(groups => this.availableGroups = groups.map(group => new Item(group.name, group.id, false))),
        takeUntil(this.unsubscribeStream$))
      .subscribe();
  }


  public groupChange(event: any): void {
    this.selectedGroup = event;
    this.isDisableButton = false;
    this.changeDetectorRef.detectChanges();
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('timetable');
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
