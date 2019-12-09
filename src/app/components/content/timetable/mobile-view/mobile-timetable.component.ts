import {Component, OnInit} from "@angular/core";
import {TimetableComponentClass} from "../timetable.model";
import {TimetableService} from "../../../../services/timetable.service";
import {takeUntil, tap} from "rxjs/operators";
import {GroupModel} from "../../../../models/group.model";
import {StateService} from "../../../../services/state.service";

@Component({
  selector: "ttp-mobile-timetable",
  templateUrl: "./mobile-timetable.component.html",
  styleUrls: ["./mobile-timetable.component.less"]
})

export class MobileTimetableComponent extends TimetableComponentClass implements OnInit {


  constructor(private timetableService: TimetableService,
              private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getScreenState()
      .pipe(takeUntil(this.unsubscribeStream$))
      .subscribe(state => {
        this.changeScreenMode(state)
      });

    this.timetableService.getTimetableByGroup()
      .pipe(
        takeUntil(this.unsubscribeStream$),
        tap((group: GroupModel) => this.uiGroup = this.processUiGroup(group)))
      .subscribe();
  }
}
