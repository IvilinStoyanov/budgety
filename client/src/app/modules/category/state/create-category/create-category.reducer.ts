import { createReducer, on } from '@ngrx/store';

import * as categoryActions from './create-category.actions';
import { ICategory } from '../../../../shared/models/interface/category';

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
