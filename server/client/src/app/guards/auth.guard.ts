import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user => {
        if (user) return true;

        this.notificationService.danger('You are not authorized, please sign in first.');
        this.router.navigate(['/']);
        return false;
      }))
    );
  }
}
