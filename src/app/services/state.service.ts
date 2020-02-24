import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {StateInterface} from '../interfaces/state.interface';

@Injectable()
export class StateService {
  private stateComponent: ReplaySubject<any> = new ReplaySubject<any>();

  public setStateComponent(state: StateInterface): void {
    this.stateComponent.next(state);
  }

  public getStateComponent(): any {
    return this.stateComponent;
  }
}
