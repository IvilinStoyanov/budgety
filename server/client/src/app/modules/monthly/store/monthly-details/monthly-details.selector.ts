import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/modules/shared/store';

import { MonthlyDetailsState } from './monthly-details.reducer';

export const selectMonthlyState = (state: AppState): MonthlyDetailsState =>
  state.monthly.monthlyDetails;

export const selectCategories = createSelector(
  selectMonthlyState,
  (state: MonthlyDetailsState) => state.categories
);

export const selectTransactions = createSelector(
  selectMonthlyState,
  (state: MonthlyDetailsState) => state.transactions
);

export const selectMonthlyCategories = createSelector(
  selectMonthlyState,
  (state: MonthlyDetailsState) => state.monthlyCategories
);

export const selectMonthlyIncome = createSelector(
  selectMonthlyState,
  (state: MonthlyDetailsState) => state.monthlyIncome
);
