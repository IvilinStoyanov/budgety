import { ICategory } from '../../../shared/models/interface/category';
import { IUser } from '../../../shared/models/interface/User';

export interface TransactionGlobalResponse {
  user: IUser;
  category: ICategory;
}
