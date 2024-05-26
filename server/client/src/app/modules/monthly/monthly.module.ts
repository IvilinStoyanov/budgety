import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { MonthlyListComponent } from './components/monthly-list/monthly-list.component';
// eslint-disable-next-line max-len
import { MonthlyTransactionListComponent } from './components/monthly-transaction-list/monthly-transaction-list.component';
import { MonthlyRoutingModule } from './monthly-routing.module';
import { MonthlyEffects } from './store/monthly.effects';
import { monthlyReducer } from './store/monthly.reducer';

@NgModule({
  declarations: [MonthlyListComponent, MonthlyTransactionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MonthlyRoutingModule,
    StoreModule.forFeature('monthly', monthlyReducer),
    EffectsModule.forFeature([MonthlyEffects])
  ]
})
export class MonthlyModule { }
