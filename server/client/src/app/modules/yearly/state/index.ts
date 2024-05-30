import { ActionReducerMap } from '@ngrx/store';

import { yearlyListReducer, YearlyListState } from './yearly/yearly.reducer';

export interface YearlyState {
  yearlyList: YearlyListState;
}

export const yearlyReducers: ActionReducerMap<YearlyState> = {
  yearlyList: yearlyListReducer
};
