import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { IUser } from 'src/app/shared/models/interface/User';

export const loadLatest = createAction('[Latest] Load Latest');

export const loadLatestSuccess = createAction(
  '[Latest] Load Latest Success',
  props<{ categories: ICategory[] }>()
);

export const loadLatestFailure = createAction(
  '[Latest] Load Latest Failure',
  props<{ error: string }>()
);

export const createTransaction = createAction(
  '[Latest] Create Transaction',
  props<{ transaction: ITransaction }>()
);

export const createTransactionSuccess = createAction(
  '[Latest] Create Transaction Success',
  props<{ category: ICategory }>()
);

export const createTransactionFailure = createAction(
  '[Latest] Create Transaction Failure',
  props<{ error: string }>()
);
