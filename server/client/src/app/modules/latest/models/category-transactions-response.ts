import { ITransaction } from 'src/app/models/interface/transaction';

export interface CategoryTransactionsResponse {
  totalPages: number;
  transactions: ITransaction[];
}
