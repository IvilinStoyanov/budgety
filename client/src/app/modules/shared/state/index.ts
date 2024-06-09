import { RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { CategoryState } from '../../category/state';
import { LatestState } from '../../latest/state/latest.reducer';
import { MonthlyState } from '../../monthly/state';
import { YearlyState } from '../../yearly/state';
import { UserState, userReducer } from './user/user.reducer';

export interface AppState {
  router: RouterReducerState<never>;
  latest: LatestState;
  monthly: MonthlyState;
  yearly: YearlyState;
  category: CategoryState;
  sharedModule: SharedState;
}

export interface SharedState {
  user: UserState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  user: userReducer
};
