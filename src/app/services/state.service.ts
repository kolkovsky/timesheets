import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";


export interface StateApplication {
  componentName: string;
  states: { [key: string]: string }
}

@Injectable()
export class StateService {

  private stateComponent: ReplaySubject<StateApplication> = new ReplaySubject(1);
  private screenState: ReplaySubject<any> = new ReplaySubject(1);

  public setStateComponent(state: StateApplication): void {
    this.stateComponent.next(state);
  }

  public getComponentState(): ReplaySubject<StateApplication> {
    return this.stateComponent;
  }

  public setScreenState(state: any): void {
    this.screenState.next(state);
  }

  public getScreenState(): ReplaySubject<any> {
    return this.screenState;
  }
}
