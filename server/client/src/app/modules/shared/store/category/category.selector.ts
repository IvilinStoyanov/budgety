import { createSelector } from '@ngrx/store';

import { SharedState } from '..';
import { CategoryState } from './category.reducer';

export const selectLatestFeature = (state: SharedState): CategoryState =>
  state.category;

export const selectLatestCategory = createSelector(
  selectLatestFeature,
  (state: CategoryState) => state.categories
);

export const selectLatestLoading = createSelector(
  selectLatestFeature,
  (state: CategoryState) => state.loading
);

export const selectLatestError = createSelector(
  selectLatestFeature,
  (state: CategoryState) => state.error
);
