import { Component, OnInit } from "@angular/core";
import { Router, RouterState } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public visibleHeader: boolean = true;

  constructor(private router: Router) {
    const state: RouterState = router.routerState;
  }

  public ngOnInit(): void {}
}
