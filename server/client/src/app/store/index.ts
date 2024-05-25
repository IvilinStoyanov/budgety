import { RouterReducerState } from '@ngrx/router-store';
import { LatestState } from 'src/app/modules/latest/store/latest.reducer';

export interface AppState {
  router: RouterReducerState<never>;
  latest: LatestState;
}
