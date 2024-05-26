import { createReducer, on } from '@ngrx/store';

import { MonthlyItem } from '../models/monthly-item';
import * as MonthlyActions from './monthly.actions';

export interface MonthlyState {
  monthlyList: { [key: number]: MonthlyItem };
  loading: boolean;
  error: string;
}

export const initialMonthlyState: MonthlyState = {
  monthlyList: {},
  loading: false,
  error: null
};

export const monthlyReducer = createReducer(
  initialMonthlyState,
  on(MonthlyActions.loadMonthlyList, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MonthlyActions.loadMonthlyListSuccess, (state, { monthlyList }) => ({
    ...state,
    loading: false,
    monthlyList
  })),
  on(MonthlyActions.loadMonthlyListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
