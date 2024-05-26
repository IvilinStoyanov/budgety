import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { selectUser } from 'src/app/modules/shared/store/user/user.selector';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private store: Store
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectUser).pipe(
      filter(user => user !== null),
      map(user => {
        const role = route.data.role as Array<string>;

        if (this.authService.roleMatch(role, user.role)) {
          return true;
        }

        this.notificationService.danger('You are not authorized.');
        return false;
      }),
      take(1)
    );
  }
}
