import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MonthlyListComponent } from './components/monthly-list/monthly-list.component';
import { MonthlyTransactionListComponent } from './components/monthly-transaction-list/monthly-transaction-list.component';
import { MonthlyRoutingModule } from './monthly-routing.module';

@NgModule({
  declarations: [MonthlyListComponent, MonthlyTransactionListComponent],
  imports: [CommonModule, SharedModule, MonthlyRoutingModule]
})
export class MonthlyModule {}
