import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { LatestComponent } from './components/latest/latest.component';
import { MonthlyComponent } from './components/monthly/monthly.component';

const routes: Routes = [
    {
      path: 'latest',
      component: LatestComponent
    },
    {
      path: 'category/:id',
      component: CategoryDetailComponent
    },
    {
      path: 'monthly',
      component: MonthlyComponent
    },
    { path: '**', redirectTo: 'latest' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }