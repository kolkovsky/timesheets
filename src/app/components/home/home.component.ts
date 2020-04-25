import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ttp-home",
  templateUrl: "./home.component.html",
})
export class TtpHomeComponent {
  constructor(private router: Router) {}

  public navigateToTimetable(): void {
    this.router.navigateByUrl("/timetable-parsing");
  }

  public navigateToAdminParsing(): void {
    this.router.navigateByUrl("/admin-parsing");
  }
}
