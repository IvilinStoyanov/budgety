import { RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import {
  userReducer,
  UserState
} from 'src/app/modules/shared/store/user/user.reducer';

import { CategoryState } from '../../category/state';
import { LatestState } from '../../latest/store/latest.reducer';
import { MonthlyState } from '../../monthly/store';
import { YearlyState } from '../../yearly/state';

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
