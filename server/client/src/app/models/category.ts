import { Items } from './interface/items';

export class Category {
  id: number;
  color: string;
  exp: number;
  expPercentage: number;
  incPercentage: number;
  icon: string;
  inc: number;
  name: string;
  isVisible: boolean;
  items: Items[];

  constructor(
    id = 0,
    color = '',
    exp = 0,
    expPercentage = 0,
    incPercentage = 0,
    icon = '',
    inc = 0,
    name = '',
    isVisible = true,
    items = []
  ) {
    this.id = id;
    this.color = color;
    this.exp = exp;
    this.expPercentage = expPercentage;
    this.incPercentage = incPercentage;
    this.icon = icon;
    this.inc = inc;
    this.name = name;
    this.isVisible = isVisible;
    this.items = items;
  }
}
