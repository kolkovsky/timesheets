import {Component, OnInit} from '@angular/core';
import {SystemsConstant} from "../../constants/systems.constant";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public viewModeValue: string = SystemsConstant.weekMode;

  constructor(private stateService: StateService) {
  }

  ngOnInit() {
  }

  public changeViewMode(): void {
    this.stateService.setStateComponent({componentName: SystemsConstant.headerComponent, states: {viewModeValue: this.viewModeValue}});
  }

}
