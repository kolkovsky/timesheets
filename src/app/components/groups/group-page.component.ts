import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'group-page',
  templateUrl: 'group-page.component.html',
  styleUrls: ['./group-page.component.less']
})

export class GroupPageComponent {

  public isDisableButton: boolean = true;
  private selectedGroup: any;
  public items: any[] = [
    {value: '', selected: true},
    {value: '1', selected: false},
    {value: '2', selected: false},
    {value: '3', selected: false}
  ];

  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
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
