import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less']
})
export class SelectorComponent implements OnInit {

  @Input()
  public items: Item[];

  @Input()
  public enabled: boolean;

  @Output()
  public valueChange: EventEmitter<Item> = new EventEmitter<Item>();

  @Input()
  public placeholder: string;


  constructor() { }

  ngOnInit() {
  }

  public changeValueSelector(event): void {
    if(event && event.target) {
      console.log(event);
    }
    //this.valueChange.emit();
  }
}
