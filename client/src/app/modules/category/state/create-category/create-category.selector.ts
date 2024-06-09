import { createSelector } from '@ngrx/store';

import { AppState } from '../../../shared/state/index';
import { CreateCategoryState } from './create-category.reducer';

export const selectLatestFeature = (state: AppState): CreateCategoryState =>
  state.category.createCategory;

export const selectLatestCategory = createSelector(
  selectLatestFeature,
  (state: CreateCategoryState) => state.category
);

export const selectLatestLoading = createSelector(
  selectLatestFeature,
  (state: CreateCategoryState) => state.loading
);

export const selectLatestError = createSelector(
  selectLatestFeature,
  (state: CreateCategoryState) => state.error
);
