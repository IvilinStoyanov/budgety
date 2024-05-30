import { createAction, props } from '@ngrx/store';

import { MonthlyItem } from '../../models/monthly-item';

export const loadMonthlyList = createAction(
  '[Monthly] Load Monthly List',
  props<{ year: number }>()
);
export const loadMonthlyListSuccess = createAction(
  '[Monthly] Load Monthly List Success',
  props<{ monthlyList: { [key: number]: MonthlyItem } }>()
);

export const loadMonthlyListFailure = createAction(
  '[Monthly] Load Monthly List Failure',
  props<{ error: string }>()
);
