import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { MonthlyListComponent } from './components/monthly-list/monthly-list.component';
// eslint-disable-next-line max-len
import { MonthlyTransactionListComponent } from './components/monthly-transaction-list/monthly-transaction-list.component';
import { MonthlyRoutingModule } from './monthly-routing.module';
import { monthlyReducers } from './state';
import { MonthlyDetailsEffects } from './state/monthly-details/monthly-details.effects';
import { MonthlyEffects } from './state/monthly-list/monthly.effects';

@NgModule({
  declarations: [MonthlyListComponent, MonthlyTransactionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MonthlyRoutingModule,
    StoreModule.forFeature('monthly', monthlyReducers),
    EffectsModule.forFeature([MonthlyEffects, MonthlyDetailsEffects])
  ]
})
export class MonthlyModule { }
