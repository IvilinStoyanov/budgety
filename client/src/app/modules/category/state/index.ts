import { ActionReducerMap } from '@ngrx/store';

import {
  createCategoryReducer,
  CreateCategoryState
} from './create-category/create-category.reducer';

export interface CategoryState {
  createCategory: CreateCategoryState;
}

export const categoryReducers: ActionReducerMap<CategoryState> = {
  createCategory: createCategoryReducer
};
