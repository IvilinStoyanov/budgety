import { ICategory } from '../../../models/interface/category';
import { IUser } from '../../../models/interface/User';

export interface TransactionGlobalResponse {
  user: IUser;
  category: ICategory;
}
