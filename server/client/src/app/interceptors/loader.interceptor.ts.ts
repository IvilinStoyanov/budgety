import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private ngxService: NgxUiLoaderService, private loaderService: LoaderService) { }

  addRequest(request: HttpRequest<any>) {
    if (!this.loaderService.isUrlIgnored(request.url)) {
      this.requests.push(request);

      this.ngxService.startLoader('loader');
    }
  }

  removeRequest(request: HttpRequest<any>) {
    if (!this.loaderService.isUrlIgnored(request.url)) {
      const index = this.requests.indexOf(request);
      if (index >= 0)
        this.requests.splice(index, 1);

      this.ngxService.stopAllLoader('loader');
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.addRequest(request);

    return new Observable(observable => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
            }

            observable.next(event);
          },
          error => {
            this.removeRequest(request);
            observable.next(error);
          },
          () => {
            this.removeRequest(request);
            observable.next();
          }
        );

      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      }
    })
  }
}
