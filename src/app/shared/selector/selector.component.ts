import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Item} from './item.model';

@Component({
  selector: 'ttp-selector',
  templateUrl: './selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {

  @Input()
  public items: Item[];

  @Input()
  public enabled: boolean = true;

  @Output()
  public valueChange: EventEmitter<Item> = new EventEmitter<Item>();

  @Input()
  public placeholder: string;

  public value: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  public ngModelValueChange(): void {
    this.changeDetectorRef.markForCheck();
  }

  public changeValueSelector(event): void {
    this.items.map(item => item.selected = item.value === this.value);
    this.valueChange.emit(this.value);
  }
}
