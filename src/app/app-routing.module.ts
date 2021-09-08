import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { LatestComponent } from './components/latest/latest.component';
import { MonthlyTransactionListComponent } from './components/monthly/monthly-transaction-list/monthly-transaction-list.component';
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
    {
      path: 'monthly/:month',
      component: MonthlyTransactionListComponent
    },
    {
      path: 'add-category',
      component: AddCategoryComponent
    },
    {
      path: 'edit-category',
      component: EditCategoryComponent
    },
    {
      path: 'add-color',
      component: AddColorComponent
    },
    { path: '**', redirectTo: 'latest' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }