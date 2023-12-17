import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ColorSketchModule } from 'ngx-color/sketch';
import { AddItemComponent } from 'src/app/shared/components/add-item/add-item.component';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { BalanceModalComponent } from 'src/app/shared/components/balance-modal/balance-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressBarComponent } from 'src/app/shared/components/progress-bar/progress-bar.component';
/* components */
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { HasRoleDirective } from 'src/app/shared/directives/hasRole.directive';
import { HighlightOnHoverDirective } from 'src/app/shared/directives/highlightOnHover.directive';
import { StopPropagationDirective } from 'src/app/shared/directives/stop-propagation.directive';

@NgModule({
  declarations: [
    HasRoleDirective,
    StopPropagationDirective,
    HighlightOnHoverDirective,

    TabsComponent,
    BalanceModalComponent,
    ProgressBarComponent,
    BackButtonComponent,
    AddItemComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
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
    ColorSketchModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
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
    ColorSketchModule,
    TabsComponent,
    ProgressBarComponent,
    BackButtonComponent,

    HasRoleDirective,
    StopPropagationDirective,
    HighlightOnHoverDirective
  ]
})
export class SharedModule {
  // static forRoot(): ModuleWithProviders<SharedModule> {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ShowOnHoverDirective]
  //   };
  // }
}
