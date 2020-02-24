import {StateService} from '../services/state.service';
import {StateInterface} from '../interfaces/state.interface';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AppComponents} from '../app.module';
import {log} from 'util';

export abstract class TtpComponent {
  public stateService: StateService;
  public stateComponent: StateInterface;
  public unsubscribeStream$: Subject<void> = new Subject<void>();

  protected constructor() {
    this.stateService = new StateService();
  }

  public loadStateComponent(): void {
    this.stateService.getStateComponent()
      .pipe(tap((state: StateInterface) => this.processState(state)))
      .subscribe();
  }

  public isComponent(componentName: string, components?: any[]): any {
    console.log(componentName)
    return AppComponents.find((innerComponent: any[] | any) => {
      console.log(innerComponent.isPrototypeOf(Array.prototype));
      if (innerComponent.isPrototypeOf(Array)) {
        this.isComponent(innerComponent);
      } else {
        console.log(innerComponent)
        if (innerComponent.name === componentName) {
          return innerComponent;
        }
      }
    });
  }

  public abstract processState(state: StateInterface): void;
}
