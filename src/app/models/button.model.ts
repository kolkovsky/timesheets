import {ClickedInterface} from './clicked.interface';
import {BaseInterface} from './base.interface';

export class ButtonModel implements ClickedInterface, BaseInterface {
  id: string;
  label: string;
  clicked: boolean;
}