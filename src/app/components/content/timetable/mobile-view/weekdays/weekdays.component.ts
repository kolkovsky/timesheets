import {Component, OnInit} from "@angular/core";
import {TimetableComponentClass} from "../../timetable.model";
import {TimetableService} from "../../../../../services/timetable.service";
import {StateService} from "../../../../../services/state.service";
import {takeUntil, tap} from "rxjs/operators";
import {GroupModel} from "../../../../../models/group.model";

@Component({
  selector: "weekdays",
  templateUrl: "./weekdays.component.html",
  styleUrls: ["./weekdays.component.less"]
})

export class WeekdaysComponent extends TimetableComponentClass implements OnInit {

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
