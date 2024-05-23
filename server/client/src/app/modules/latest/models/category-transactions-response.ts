import { ITransaction } from 'src/app/shared/models/interface/transaction';

export interface CategoryTransactionsResponse {
  length: number;
  transactions: ITransaction[];
}
