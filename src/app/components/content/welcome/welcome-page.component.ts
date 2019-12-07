import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less']
})

export class WelcomePageComponent implements OnInit {


  public visiblePopup: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  public navigateToCoursePage(): void {
    this.router.navigateByUrl('/course');
  }


  public closePopupEvent(event): void {
    this.visiblePopup = !this.visiblePopup;
  }

  public showPopup(): void {
    this.visiblePopup = true;
}

}
