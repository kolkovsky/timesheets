import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserManagerService} from "./user-manager.service";

@Injectable({
  providedIn: "root"
})

export class NavigationGuard implements CanActivate {

  constructor(private userManagerService: UserManagerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url);

    if (state.url === "/course") {

    } else if (state.url === "/group") {

    } else if (state.url === "/timetable") {

    } else if (state.url == "/welcome") {

    } else if (state.url === "") {

    }

    return true;
  }

}
