import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message || 'Unexpected error, please try again.';

        this.notificationService.danger(message);

        return throwError(message);
      })
    );
  }
}
