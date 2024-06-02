import { ActionReducerMap } from '@ngrx/store';

import {
  monthlyDetailsReducer,
  MonthlyDetailsState
} from './monthly-details/monthly-details.reducer';
import {
  MonthlyListState,
  monthlyReducer
} from './monthly-list/monthly.reducer';

export interface MonthlyState {
  monthlyList: MonthlyListState;
  monthlyDetails: MonthlyDetailsState;
}

export const monthlyReducers: ActionReducerMap<MonthlyState> = {
  monthlyList: monthlyReducer,
  monthlyDetails: monthlyDetailsReducer
};
