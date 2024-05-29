import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/modules/shared/store';

import { YearlyListState } from './yearly.reducer';

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
