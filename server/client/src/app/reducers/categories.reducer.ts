import * as categoryActions from '../actions/categories.actions';
import { CategoriesActions } from '../actions/categories.actions';
import { ICategory } from '../models/interface/category';

export interface CategoriesState {
  list: ICategory[];
  loading: boolean;
  error: Error;
};

export const initialState: CategoriesState = {
  list: [],
  loading: false,
  error: undefined
};

export function categoriesReducer(state: CategoriesState = initialState, action: CategoriesActions) {
  switch (action.type) {
    case categoryActions.CATEGORIES_LOAD:
      return { ...state, loading: true }
    case categoryActions.CATEGORIES_SUCCESS:
      return { ...state, list: action.payload, loading: false }
    case categoryActions.CATEGORIES_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state;
  }
}
