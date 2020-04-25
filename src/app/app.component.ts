import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public headerEnabled: boolean = false;

  constructor(private router: Router) {
  }

  public ngOnInit(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart), 
      tap((event: NavigationStart) => {
        const url: string = event.url;
        this.headerEnabled = !(url === "/" || url == "login");
    })).subscribe();
  }
}
