import { createReducer, on } from '@ngrx/store';

import * as yearlyActions from './yearly.actions';

export interface YearlyListState {
  yearlyList: { [key: number]: yearlyActions.YearlyItem };
  loading: boolean;
  error: string;
}

const initialYearlyState: YearlyListState = {
  yearlyList: {},
  loading: false,
  error: null
};

export const yearlyListReducer = createReducer(
  initialYearlyState,
  on(yearlyActions.loadYearlyList, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(yearlyActions.loadYearlyListSuccess, (state, { yearlyList }) => ({
    ...state,
    yearlyList,
    loading: false
  })),
  on(yearlyActions.loadYearlyListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
