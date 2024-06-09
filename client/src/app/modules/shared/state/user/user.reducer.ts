import { createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';
import { IUser } from '../../../../shared/models/interface/User';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.logoutUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.logoutUserSuccess, state => ({
    ...state,
    loading: false,
    user: null
  })),
  on(UserActions.logoutUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
