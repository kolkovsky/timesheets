import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { filter, tap } from "rxjs/operators";
import { StateService } from "./services/state.service";
import { States } from "./constants/states";
import { TtpHeaderComponent } from "./components/header/header.component";

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
          this.changeHeaderLinks(url);
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

    if (url === "/timetable-details") {
      this.stateService.setStateComponent({
        componentName: TtpHeaderComponent.name,
        payload: { stateName: States.visibleSaveTimetableButton, value: true },
      });
    } else {
      this.stateService.setStateComponent({
        componentName: TtpHeaderComponent.name,
        payload: { stateName: States.visibleSaveTimetableButton, value: false },
      });
    }
  }

  private changeHeaderLinks(url: string): void {
    switch (url) {
      case "/timetable":
        this.setHeaderComponentState([
          {
            link: "/home",
            name: "Главная",
          },
          {
            link: "/parsing",
            name: "Файлы",
          },
        ]);
        break;
      case "/parsing":
        this.setHeaderComponentState([
          {
            link: "/home",
            name: "Главная",
          },
          {
            link: "/timetable",
            name: "Раписание",
          },
        ]);
        break;
      case "/home":
        this.setHeaderComponentState([
          {
            link: "/parsing",
            name: "Файлы",
          },
          {
            link: "/timetable",
            name: "Расписание",
          },
        ]);
        break;
      default:
        break;
    }
  }

  private setHeaderComponentState(items: any[]): void {
    this.stateService.setStateComponent({
      componentName: TtpHeaderComponent.name,
      payload: {
        stateName: States.headerLinksChange,
        value: items,
      },
    });
  }
}
