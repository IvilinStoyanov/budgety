import { ITransaction } from 'src/app/shared/models/interface/transaction';

export interface CategoryTransactionsResponse {
  totalPages: number;
  transactions: ITransaction[];
}
