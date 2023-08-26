export interface ICategory {
  name: string;
  color: string;
  icon: string;
  _id?: string;
  exp: number;
  categoryId?: number;
  inc: number;
  transactionsCount?: number;
  isVisible?: boolean;
  _user?: string;
  incPercentage?: number;
  expPercentage?: number;
  isSelected?: boolean;
}
