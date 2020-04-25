import { HostListener, OnDestroy, OnInit } from "@angular/core";
import { StateService } from "../services/state.service";
import { takeUntil, tap } from "rxjs/operators";
import { State } from "../interfaces/state.interface";
import { Subject } from "rxjs";
import { States } from "../constants/states";

export class TtpBaseComponent implements OnInit, OnDestroy {
  protected stateComponent: State;
  protected unsubscribeStream$: Subject<void> = new Subject<void>();

  constructor(protected stateService: StateService) {}

  public ngOnInit(): void {
    this.initScreenState();
    this.stateService
      .getStateComponent()
      .pipe(
        tap((state: State) => {
          const componentName: string = this.getComponentName();
          if (state.componentName === componentName) {
            this.processState(state);
          }
        }),
        takeUntil(this.unsubscribeStream$)
      )
      .subscribe();
  }

  private initScreenState(): void {
    this.stateComponent = {
      componentName: this.getComponentName(),
      payload: {
        stateName: States.screenResizeState,
        screenWidth: innerWidth,
      },
    };
  }

  private getComponentName(): string {
    return Object.getPrototypeOf(this).constructor.name;
  }

  protected processState(state: State): void {
    this.stateComponent = state;
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
