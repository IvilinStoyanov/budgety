import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorSketchModule } from 'ngx-color/sketch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/* components */
import { TabsComponent } from 'src/app/components/common/tabs/tabs.component';
import { BalanceModalComponent } from 'src/app/components/common/tabs/modals/balance-modal/balance-modal.component';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

import { HasRoleDirective } from 'src/app/directives/hasRole.directive';
import { StopPropagationDirective } from 'src/app/directives/stop-propagation.directive';
import { ProgressBarComponent } from 'src/app/components/common/progress-bar/progress-bar.component';
import { BackButtonComponent } from 'src/app/components/common/back-button/back-button.component';
import { RouterModule } from '@angular/router';
import { HighlightOnHoverDirective } from 'src/app/directives/highlightOnHover.directive';

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
