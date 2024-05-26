import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';

import * as categoryActions from './category.actions';

export interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: ''
};

export const categoryReducer = createReducer(
  initialState,
  on(categoryActions.loadCategory, state => ({ ...state, loading: true })),
  on(categoryActions.loadCategorySuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories
  })),
  on(categoryActions.loadCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
