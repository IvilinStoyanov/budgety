import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/common/header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor.ts';
import { SharedModule } from './modules/shared/shared.module';

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
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
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
