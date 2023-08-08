import { ICategory } from '../../../models/interface/category';
import { IUser } from '../../../models/interface/User';

export interface CategoryInitialImportResponse {
  user: IUser;
  categories: ICategory[];
}
