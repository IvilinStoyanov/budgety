import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { BudgetOverviewComponent } from './components/budget-overview/budget-overview.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { LatestListComponent } from './components/latest-list/latest-list.component';
import { LatestRoutingModule } from './latest-routing.module';
import { LatestEffects } from './store/latest.effects';
import * as fromLatest from './store/latest.reducer';

@NgModule({
  declarations: [
    LatestListComponent,
    CategoryDetailComponent,
    BudgetOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('latest', fromLatest.latestReducer),
    EffectsModule.forFeature([LatestEffects]),
    LatestRoutingModule
  ]
})
export class LatestModule {}
