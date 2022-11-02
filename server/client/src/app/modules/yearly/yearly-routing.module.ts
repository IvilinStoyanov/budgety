import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearlyListComponent } from './components/yearly-list/yearly-list.component';

const routes: Routes = [
  { path: '', component: YearlyListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearlyRoutingModule { }
