import { createReducer, on } from '@ngrx/store';

import * as latest from './latest.actions';
import { ICategory } from '../../../shared/models/interface/category';

export interface LatestState {
  categories: ICategory[];
  loading: boolean;
  error: string;
}

export const initialState: LatestState = {
  categories: [],
  loading: false,
  error: ''
};

export const latestReducer = createReducer(
  initialState,
  on(latest.loadLatest, state => ({ ...state, loading: true })),
  on(latest.loadLatestSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories
  })),
  on(latest.loadLatestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(latest.createTransaction, state => ({ ...state, loading: true })),
  on(latest.createTransactionSuccess, (state, { category }) => {
    const updatedCategories = state.categories.map(cat =>
      cat._id === category._id ? { ...cat, ...category } : cat
    );

    return {
      ...state,
      loading: false,
      categories: updatedCategories
    };
  })
);
