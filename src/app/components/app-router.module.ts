import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TtpHomeComponent } from "./home/home.component";
import { TtpFileParsingComponent } from "./parsing/file-parsing.component";
import { TtpTimetableComponent } from "./timetable/timetable.component";
import { TtpLoginComponent } from "./login/login.component";
import { TtpAddTimetableComponent } from "./timetable/add-timetable/add-timetable.component";

const routes: Routes = [
  { path: "login", component: TtpLoginComponent },
  { path: "home", component: TtpHomeComponent },
  { path: "", component: TtpLoginComponent },
  { path: "parsing", component: TtpFileParsingComponent },
  { path: "timetable", component: TtpTimetableComponent },
  { path: "timetable-details", component: TtpAddTimetableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRouterModule {}
