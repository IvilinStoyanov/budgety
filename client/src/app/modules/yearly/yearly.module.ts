import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { YearlyListComponent } from './components/yearly-list/yearly-list.component';
import { yearlyReducers } from './state';
import { YearlyEffects } from './state/yearly/yearly.effects';
import { YearlyRoutingModule } from './yearly-routing.module';

@NgModule({
  declarations: [YearlyListComponent],
  imports: [
    CommonModule,
    SharedModule,
    YearlyRoutingModule,
    StoreModule.forFeature('yearly', yearlyReducers),
    EffectsModule.forFeature([YearlyEffects])
  ]
})
export class YearlyModule {}
