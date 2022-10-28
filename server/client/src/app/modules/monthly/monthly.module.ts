import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MonthlyRoutingModule } from './monthly-routing.module';

import { MonthlyListComponent } from './components/monthly-list/monthly-list.component';
import { MonthlyTransactionListComponent } from './components/monthly-transaction-list/monthly-transaction-list.component';



@NgModule({
  declarations: [
    MonthlyListComponent,
    MonthlyTransactionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonthlyRoutingModule
  ]
})
export class MonthlyModule { }
