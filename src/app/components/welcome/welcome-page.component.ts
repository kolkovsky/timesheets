import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html'
})

export class WelcomePageComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  public navigateToTimetable(): void {
    this.router.navigateByUrl('/timetable-parsing');
  }

  public navigateToAdminParsing(): void {
    this.router.navigateByUrl('/admin-parsing');
  }
}
