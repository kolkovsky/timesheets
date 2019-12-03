import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from "../../../shared/selector/item.model";
import {TimetableService} from "../../../services/timetable.service";

@Component({
  selector: 'group-page',
  templateUrl: 'group-page.component.html',
  styleUrls: ['./group-page.component.less']
})

export class GroupPageComponent implements OnInit {

  public isDisableButton: boolean = true;
  private selectedGroup: any;
  public availableGroups: Item[];

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private timetableService: TimetableService) {
  }

  ngOnInit(): void {
    this.loadAvailableGroups();
  }

  private loadAvailableGroups(): void {
    this.timetableService.getGroupByCourseNumber().subscribe(groups => {
      this.availableGroups = groups.map(group => new Item(group.name, group.id, false));
    });
  }

  public groupChange(event: any): void {
    this.selectedGroup = event;
    this.isDisableButton = false;
    this.changeDetectorRef.detectChanges();
  }

  public navigateToGroupPage(): void {
    this.router.navigateByUrl('timetable');
  }
}
