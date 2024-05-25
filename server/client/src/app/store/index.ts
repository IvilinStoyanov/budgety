import { RouterReducerState } from '@ngrx/router-store';

import { LatestState } from '../modules/latest/store/latest.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  router: RouterReducerState<never>;
  user: UserState;
  latest: LatestState;
}
