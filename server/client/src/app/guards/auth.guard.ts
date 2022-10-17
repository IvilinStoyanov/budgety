import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user => {
        if (user) return true;

        this.notificationService.danger('You are not authorized, please sign in first.');
        return false;
      }), take(1))
    );
  }
}
