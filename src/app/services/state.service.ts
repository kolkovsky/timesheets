import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { State } from "../interfaces/state.interface";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private stateComponent: ReplaySubject<any> = new ReplaySubject<any>();

  public setStateComponent(state: State): void {
    this.stateComponent.next(state);
  }

  public getStateComponent(): ReplaySubject<State> {
    return this.stateComponent;
  }
}
