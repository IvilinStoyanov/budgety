import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.store.select(selectUser).pipe(
      filter(user => user !== null),
      take(1),
      map(user => {
        if (user) {
          return true;
        }

        this.notificationService.danger(
          'You are not authorized, please sign in first.'
        );
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
