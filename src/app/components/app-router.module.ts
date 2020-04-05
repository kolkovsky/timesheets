import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome/welcome-page.component';
import {AdminParsingComponent} from './admin-parsing/admin-parsing.component';
import {TimetableParsingComponent} from './timetable-parsing/timetable-parsing.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomePageComponent, data: {animation: 'WelcomePage'}},
  {path: '', component: WelcomePageComponent, data: {animation: 'WelcomePage'}},
  {path: 'admin-parsing', component: AdminParsingComponent},
  {path: 'timetable-parsing', component: TimetableParsingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})

export class AppRouterModule {
}
