import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private notificationService: NotificationService) { }
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(map(user => {
      const role = route.data.role as Array<string>;

      if (this.authService.roleMatch(role, user.role)) {
        return true;
      }

      this.notificationService.danger('You are not authorized.');
      return false
    }), take(1));
  }
}
