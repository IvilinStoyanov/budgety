import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyListComponent } from './components/monthly-list/monthly-list.component';
import { MonthlyTransactionListComponent } from './components/monthly-transaction-list/monthly-transaction-list.component';

const routes: Routes = [
  {
    path: '', component: MonthlyListComponent
  },
  { path: ':month', component: MonthlyTransactionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyRoutingModule { }
