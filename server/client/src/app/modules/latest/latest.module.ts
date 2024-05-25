import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { LatestListComponent } from './components/latest-list/latest-list.component';
import { SetupCategoriesComponent } from './components/latest-list/modals/setup-categories/setup-categories.component';
import { LatestRoutingModule } from './latest-routing.module';
import { LatestEffects } from './store/latest.effects';
import * as fromLatest from './store/latest.reducer';

@NgModule({
  declarations: [
    LatestListComponent,
    CategoryDetailComponent,
    SetupCategoriesComponent
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
