import { createSelector } from '@ngrx/store';

import { YearlyListState } from './yearly.reducer';
import { AppState } from '../../../shared/state';

export const selectYearlyState = (state: AppState): YearlyListState =>
  state.yearly.yearlyList;

export const selectYearlyList = createSelector(
  selectYearlyState,
  (state: YearlyListState) => state.yearlyList
);

export const selectYearlyListLoading = createSelector(
  selectYearlyState,
  (state: YearlyListState) => state.loading
);

export const selectYearlyListError = createSelector(
  selectYearlyState,
  (state: YearlyListState) => state.error
);
