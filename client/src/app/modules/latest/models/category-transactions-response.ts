import { ITransaction } from "../../../shared/models/interface/transaction";

export interface CategoryTransactionsResponse {
  length: number;
  transactions: ITransaction[];
}
