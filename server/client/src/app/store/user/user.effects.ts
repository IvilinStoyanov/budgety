import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

import * as userActions from './user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) { }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap(() =>
        this.authService.fetchUser().pipe(
          map(user => userActions.loadUserSuccess({ user })),
          catchError(error => of(userActions.loadUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      mergeMap(({ user }) =>
        of(this.commonService.calculateUserBudget(user)).pipe(
          map(updatedUser =>
            userActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError(error => of(userActions.updateUserFailure({ error })))
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.logoutUser),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => userActions.logoutUserSuccess()),
          catchError(error =>
            of(userActions.logoutUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  logoutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logoutUserSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
