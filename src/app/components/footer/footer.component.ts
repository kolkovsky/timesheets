import {Component, OnInit, Input} from '@angular/core';
import {StateApplication, StateService} from "../../services/state.service";
import {tap} from "rxjs/operators";
import {AppComponent} from 'src/app/models/app-component.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements AppComponent, OnInit {

  @Input()
  public visibleFooter: boolean = true;
  events: any[];
  state: StateApplication;


  constructor(private stateService: StateService) {
  }


  ngOnInit() {
    this.stateService.getComponentState()
      .pipe(tap((state) => this.state = state))
      .subscribe();
  }

  processStateComponent(): void {
    
  }
}
