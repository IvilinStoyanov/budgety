import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';

import * as latest from './latest.actions';

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
  }))
);
