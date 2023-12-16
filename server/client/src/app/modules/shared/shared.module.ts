import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ColorSketchModule } from 'ngx-color/sketch';
import { AddItemComponent } from 'src/app/shared/components/add-item/add-item.component';
import { BalanceModalComponent } from 'src/app/shared/components/balance-modal/balance-modal.component';
/* components */
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { HasRoleDirective } from 'src/app/shared/directives/hasRole.directive';
import { HighlightOnHoverDirective } from 'src/app/shared/directives/highlightOnHover.directive';
import { StopPropagationDirective } from 'src/app/shared/directives/stop-propagation.directive';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressBarComponent } from 'src/app/shared/components/progress-bar/progress-bar.component';

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
    RouterModule,
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
    ColorSketchModule,
    Ng2SearchPipeModule,
    NgxChartsModule
  ],
  exports: [
    RouterModule,
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
    ColorSketchModule,
    Ng2SearchPipeModule,
    NgxChartsModule,

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
