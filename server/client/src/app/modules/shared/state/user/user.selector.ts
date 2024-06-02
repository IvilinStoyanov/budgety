import { createSelector } from '@ngrx/store';

import { AppState } from '..';
import { UserState } from './user.reducer';

export const selectUserState = (state: AppState): UserState =>
  state.sharedModule.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
