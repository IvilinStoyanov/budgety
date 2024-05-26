import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MonthlyState } from './monthly.reducer';

export const selectMonthlyState =
  createFeatureSelector<MonthlyState>('monthly');

export const selectMonthlyList = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.monthlyList
);

export const selectMonthlyLoading = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.loading
);

export const selectMonthlyError = createSelector(
  selectMonthlyState,
  (state: MonthlyState) => state.error
);
