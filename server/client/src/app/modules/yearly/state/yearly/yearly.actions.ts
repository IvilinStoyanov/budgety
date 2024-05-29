import { createAction, props } from '@ngrx/store';

export const loadYearlyList = createAction(
  '[Yearly] Load Yearly List',
  props<{ startYear: number; endYear: number }>()
);

export const loadYearlyListSuccess = createAction(
  '[Yearly] Load Yearly List Success',
  props<{ yearlyList: { [key: number]: YearlyItem } }>()
);

export const loadYearlyListFailure = createAction(
  '[Yearly] Load Yearly List Failure',
  props<{ error: string }>()
);

export interface YearlyItem {
  name: number;
  income: number;
  expense: number;
  budgetPercentage: number;
}
