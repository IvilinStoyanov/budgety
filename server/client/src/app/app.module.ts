import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

/* components */
import { AppComponent } from './app.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LatestComponent } from './components/latest/latest.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { MonthlyTransactionListComponent } from './components/monthly/monthly-transaction-list/monthly-transaction-list.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { TabsComponent } from './components/common/tabs/tabs.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { BackButtonComponent } from './components/common/back-button/back-button.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { BalanceModalComponent } from './components/common/tabs/modals/balance-modal/balance-modal.component';

/* directives */
import { StopPropagationDirective } from './directives/stop-propagation.directive';

/* material modules */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';

/* additional modules */
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColorSketchModule } from 'ngx-color/sketch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { YearlyComponent } from './components/yearly/yearly.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LatestComponent,
    MonthlyComponent,
    AddItemComponent,
    CategoryDetailComponent,
    ProgressBarComponent,
    TabsComponent,
    AddColorComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BackButtonComponent,
    ConfirmDialogComponent,
    StopPropagationDirective,
    MonthlyTransactionListComponent,
    BalanceModalComponent,
    YearlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatSidenavModule,
    NoopAnimationsModule,
    ColorSketchModule,
    Ng2SearchPipeModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}