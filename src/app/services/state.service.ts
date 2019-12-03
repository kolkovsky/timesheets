import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";


export interface StateApplication {
  componentName: string;
  states: { [key: string]: string }
}

@Injectable()
export class StateService {

  private stateComponent: ReplaySubject<StateApplication> = new ReplaySubject(1);

  public setStateComponent(state: StateApplication): void {
    this.stateComponent.next(state);
  }

  public getComponentState(): ReplaySubject<StateApplication> {
    return this.stateComponent;
  }


}
