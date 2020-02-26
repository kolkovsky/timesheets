import {OnDestroy, OnInit} from '@angular/core';
import {StateService} from '../services/state.service';
import {takeUntil, tap} from 'rxjs/operators';
import {StateInterface} from '../interfaces/state.interface';
import {Subject} from 'rxjs';

export class TtpBaseComponent implements OnInit, OnDestroy {
  protected stateComponent: StateInterface;
  protected unsubscribeStream$: Subject<void> = new Subject<void>();

  constructor(protected stateService: StateService) {
  }

  public ngOnInit(): void {
    this.stateService.getStateComponent()
      .pipe(
        tap((state: StateInterface) => {
          const componentName: string = Object.getPrototypeOf(this).constructor.name;
          if (state.componentName === componentName) {
            this.processState(state);
          }
        }),
        takeUntil(this.unsubscribeStream$))
      .subscribe();
  }

  protected processState(state: StateInterface): void {
    this.stateComponent = state;
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
