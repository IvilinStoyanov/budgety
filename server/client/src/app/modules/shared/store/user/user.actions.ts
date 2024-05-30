import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/interface/User';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: IUser }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: IUser }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUser }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

export const logoutUser = createAction('[User] Logout User');

export const logoutUserSuccess = createAction('[User] Logout User Success');

export const logoutUserFailure = createAction(
  '[User] Logout User Failure',
  props<{ error: string }>()
);
