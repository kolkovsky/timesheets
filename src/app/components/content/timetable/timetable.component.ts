import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimetableService} from "../../../services/timetable.service";
import {UiGroupModel} from "../../../models/ui-group.model";
import {StateService} from "../../../services/state.service";
import {takeUntil, tap} from "rxjs/operators";
import {TimetableComponentClass} from "./timetable.model";
import {GroupModel} from "../../../models/group.model";
import {SubjectDetailsEvent} from "./table/table.component";
import {SystemsConstant} from "../../../constants/systems.constant";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent extends TimetableComponentClass implements OnInit, OnDestroy {

  public uiGroup: UiGroupModel;

  public visibleSubjectDetailsPopup: boolean = false;
  public visibleSubjectDetailsCard: boolean = false;
  public closeWithAnimation: boolean = false;
  public selectedSubject: any;

  constructor(private timetableService: TimetableService,
              private stateService: StateService) {
    super();
  }

  ngOnInit() {
    this.changeScreenMode(window.innerWidth);
    this.stateService.getScreenState()
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe(state => this.changeScreenMode(state));

    this.timetableService.getTimetableByGroup()
      .pipe(
        takeUntil(this.unsubscribeStream$),
        tap((group: GroupModel) => this.uiGroup = this.processUiGroup(group)))
      .subscribe();
  }

  public openSubjectDetails(event: SubjectDetailsEvent){
    console.log(event);
    if(event.viewMode === SystemsConstant.POPUP_VIEW_MODE) {
      this.selectedSubject = event.subject;
      this.visibleSubjectDetailsPopup = true;
    } else {
      this.selectedSubject = event.subject;
      this.visibleSubjectDetailsCard = true;
    }
  }

  public closeSubjectDetailsPopup(event): void {
    // this.closeWithAnimation = true;
    this.visibleSubjectDetailsPopup = false;
  }



  ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
