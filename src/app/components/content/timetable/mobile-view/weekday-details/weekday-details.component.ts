import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StateApplication, StateService} from "../../../../../services/state.service";
import {SystemsConstant} from "../../../../../constants/systems.constant";
import {WeekDaysConstant} from "../../../../../constants/week-days.constant";
import {TimetableComponentClass} from "../../timetable.model";

@Component({
  selector: "weekday-details",
  templateUrl: "./weekday-details.component.html",
  styleUrls: ["./weekday-details.component.less"]
})
export class WeekdayDetailsComponent extends TimetableComponentClass implements OnInit {

  public sortedSubject: any;
  public subjectsByDay: any[];

  constructor(private router: ActivatedRoute,
              private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getComponentState().subscribe((state: StateApplication) => {
      if (state.componentName === SystemsConstant.timetableComponent) {
        this.sortedSubject = state.states.sortedSubjects;
        const day_en = this.router.snapshot.paramMap.get("weekday");
        const day_ru = WeekDaysConstant.WEEKDAYS_ON_RUSSIAN[day_en];
        this.subjectsByDay = this.sortedSubject[day_ru];
      }
    });
  }
}
