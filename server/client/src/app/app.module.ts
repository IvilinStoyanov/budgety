import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuardGuard } from './shared/guards/role-guard.guard';
import { ErrorCatchingInterceptor } from './shared/interceptors/error-catching.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor.ts';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#179ff7',
  fgsPosition: 'center-center',
  fgsSize: 80,
  fgsType: 'three-bounce',
  overlayColor: 'rgb(255,255,255)',
  pbColor: '#179ff7',
  pbThickness: 3,
  hasProgressBar: true
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    },
    AuthGuard,
    RoleGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
