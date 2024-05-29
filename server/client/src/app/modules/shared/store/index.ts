import { RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import {
  categoryReducer,
  CategoryState
} from 'src/app/modules/shared/store/category/category.reducer';
import {
  userReducer,
  UserState
} from 'src/app/modules/shared/store/user/user.reducer';

import { LatestState } from '../../latest/store/latest.reducer';
import { MonthlyState } from '../../monthly/store';
import { YearlyState } from '../../yearly/state';

export interface AppState {
  router: RouterReducerState<never>;
  latest: LatestState;
  monthly: MonthlyState;
  yearly: YearlyState;
  sharedModule: SharedState;
}

export interface SharedState {
  user: UserState;
  category: CategoryState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  user: userReducer,
  category: categoryReducer
};
