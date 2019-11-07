export class Item {
  value: string;
  id?: string;
  selected: boolean;

  constructor(value: string, id: string, selected: boolean) {
    this.value = value;
    this.id = id;
    this.selected = selected;
  }
}
