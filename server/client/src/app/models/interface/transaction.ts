export interface ITransaction {
  _id?: string;
  dateCreated: string;
  description: string;
  type: string;
  value: number;
  _categoryId: string;
}
