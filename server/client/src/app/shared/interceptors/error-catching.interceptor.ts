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
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message ||
          this.translateService.instant('errors.unexpected');

        this.notificationService.danger(message);

        return throwError(message);
      })
    );
  }
}
