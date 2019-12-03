import {StateApplication} from "../services/state.service";

export interface AppComponent {
  state: StateApplication;
  events: any[];


  processStateComponent(): void;
}
