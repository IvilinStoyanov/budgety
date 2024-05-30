import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';

import * as categoryActions from './create-category.actions';

export interface CreateCategoryState {
  category: ICategory[];
  loading: boolean;
  error: string;
}

export const initialState: CreateCategoryState = {
  category: [],
  loading: false,
  error: ''
};

export const createCategoryReducer = createReducer(
  initialState,
  on(categoryActions.createCategory, state => ({ ...state, loading: true })),
  on(categoryActions.createCategorySuccess, state => ({
    ...state,
    loading: false
  })),
  on(categoryActions.createCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
