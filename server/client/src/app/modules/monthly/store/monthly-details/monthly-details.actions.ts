import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';

export const loadMonthlyDetails = createAction(
  '[Monthly] Load Monthly Details',
  props<{ year: number; month: string }>()
);

export const loadMonthlyDetailsSuccess = createAction(
  '[Monthly] Load Monthly Details Success',
  props<{ categories: ICategory[]; transactions: ITransaction[] }>()
);

export const loadMonthlyDetailsFailure = createAction(
  '[Monthly] Load Monthly Details Failure',
  props<{ error: string }>()
);
