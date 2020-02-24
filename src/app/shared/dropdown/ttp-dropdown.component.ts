import {Component, Input, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap';
import {BaseInterface} from '../../models/base.interface';

export class DropdownModel implements BaseInterface {
  id: string;
  label: string;
  selected: boolean;
}
@Component({
  selector: 'ttp-dropdown',
  templateUrl: './ttp-dropdown.component.html',
  styleUrls: ['./ttp-dropdown.component.less'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class TtpDropdownComponent implements OnInit {
  @Input()
  public items: DropdownModel[];

  public selectedItem: DropdownModel;

  public backgroundColor: string = 'danger';

  public ngOnInit(): void {
    this.selectedItem = this.items.find(item => item.selected);
  }

  public chooseItem(item: DropdownModel): void {
    this.selectedItem = item;
  }
}
