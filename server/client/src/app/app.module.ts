import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* components */
import { AppComponent } from './app.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LatestComponent } from './components/latest/latest.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { BalanceModalComponent } from './components/common/tabs/modals/balance-modal/balance-modal.component';
import { YearlyComponent } from './components/yearly/yearly.component';
import { HomeComponent } from './components/home/home.component';
import { SetupCategoriesComponent } from './components/latest/modals/setup-categories/setup-categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
    HeaderComponent,
    HomeComponent,
    LatestComponent,
    AddItemComponent,
    CategoryDetailComponent,
    AddColorComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ConfirmDialogComponent,
    BalanceModalComponent,
    YearlyComponent,
    SetupCategoriesComponent,
    DashboardComponent
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
