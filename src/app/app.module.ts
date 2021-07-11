import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LatestComponent } from './components/latest/latest.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { TabsComponent } from './components/common/tabs/tabs.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { BackButtonComponent } from './components/common/back-button/back-button.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

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
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColorSketchModule } from 'ngx-color/sketch'; 

@NgModule({
  declarations: [
    AppComponent,
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
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatSidenavModule,
    NoopAnimationsModule,
    ColorSketchModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
