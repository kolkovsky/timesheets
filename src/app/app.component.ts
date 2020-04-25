import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { filter, tap } from "rxjs/operators";
import { StateService } from "./services/state.service";
import { States } from "./constants/states";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public headerEnabled: boolean = false;

  constructor(private router: Router, private stateService: StateService) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap((event: NavigationStart) => {
          const url: string = event.url;
          this.headerEnabled = !(url === "/" || url == "/login");
          this.processURLPATH(url);
        })
      )
      .subscribe();
  }

  private processURLPATH(url: string): void {
    if (url === "/timetable") {
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.showCreateTimetableButton },
      });
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.showEditTimetableButton },
      });
    } else {
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.hideCreateTimetableButton },
      });
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.hideEditTimtableButton },
      });
    }

    if (url === "/parsing") {
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.showAllUploadedFilesButton },
      });
    } else {
      this.stateService.setStateComponent({
        componentName: "TtpHeaderComponent",
        payload: { stateName: States.hideAllUploadedFilesButton },
      });
    }
  }
}
