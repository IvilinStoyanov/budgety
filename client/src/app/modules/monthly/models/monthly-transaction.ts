import { ITransaction } from "../../../shared/models/interface/transaction";

export interface MonthlyTransaction {
  [key: string]: {
    name: string;
    exp: number;
    inc: number;
    items: ITransaction[];
  };
}
