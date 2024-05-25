// src/app/modules/latest/store/latest.selectors.ts

import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';

import { LatestState } from './latest.reducer';

export const selectLatestFeature = (state: AppState): LatestState =>
  state.latest;

export const selectLatestCategory = createSelector(
  selectLatestFeature,
  (state: LatestState) => state.categories
);

export const selectLatestLoading = createSelector(
  selectLatestFeature,
  (state: LatestState) => state.loading
);

export const selectLatestError = createSelector(
  selectLatestFeature,
  (state: LatestState) => state.error
);
