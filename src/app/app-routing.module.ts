import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestComponent } from './components/latest/latest.component';
import { MonthlyComponent } from './components/monthly/monthly.component';

const routes: Routes = [
    {
      path: '',
      component: LatestComponent
    },
    {
      path: 'monthly',
      component: MonthlyComponent
    },
    { path: '**', redirectTo: '' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }