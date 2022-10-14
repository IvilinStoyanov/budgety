export interface ICategory {
  _id: string;
  name: string;
  color: string;
  icon: string;
  exp: number;
  categoryId: number;
  inc: number;
  transactionsCount: number;
  isVisible: boolean;
  _user: string;
  incPercentage: number;
  expPercentage: number;
}
