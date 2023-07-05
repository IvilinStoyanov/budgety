export interface ITransaction {
  id: number;
  _id: number;
  dateCreated: string;
  description: string;
  type: string;
  value: number;
  _categoryId: string;
}
