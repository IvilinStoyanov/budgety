import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as userActions from 'src/app/modules/shared/state/user/user.actions';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.store.select(selectUser).pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return of(true);
        }

        return this.authService.fetchUser().pipe(
          map(fetchedUser => {
            if (fetchedUser) {
              this.store.dispatch(
                userActions.loadUserSuccess({ user: fetchedUser })
              );
              return true;
            }

            this.notificationService.danger(
              'You are not authorized, please sign in first.'
            );
            this.router.navigate(['/']);
            return false;
          }),
          catchError(() => {
            this.notificationService.danger(
              'You are not authorized, please sign in first.'
            );
            this.router.navigate(['/']);
            return of(false);
          })
        );
      })
    );
  }
}
