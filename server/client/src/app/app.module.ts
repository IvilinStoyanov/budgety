import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';

/* interceptors */
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor.ts';

/* guards */
import { AuthGuard } from './guards/auth.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { SharedModule } from './modules/shared/shared.module';

/* loader */
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig
} from "ngx-ui-loader";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
    AuthGuard,
    RoleGuardGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
