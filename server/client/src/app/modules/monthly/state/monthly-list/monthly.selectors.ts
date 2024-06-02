import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MonthlyState } from '../index';

export const selectMonthlyState =
  createFeatureSelector<MonthlyState>('monthly');

export const selectMonthlyList = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.monthlyList.monthlyList
);

export const selectMonthlyLoading = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.monthlyList.loading
);

export const selectMonthlyError = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.monthlyList.error
);
