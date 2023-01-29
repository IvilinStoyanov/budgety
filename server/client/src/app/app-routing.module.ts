import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'latest',
    loadChildren: () => import('./modules/latest/latest.module').then(m => m.LatestModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'monthly',
    loadChildren: () => import('./modules/monthly/monthly.module').then(m => m.MonthlyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'yearly',
    loadChildren: () => import('./modules/yearly/yearly.module').then(m => m.YearlyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories-action',
    loadChildren: () => import('./modules/categories-action/categories-action.module').then(m => m.CategoriesActionModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'colors',
    loadChildren: () => import('./modules/colors/colors.module').then(m => m.ColorsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuardGuard],
    data: { role: ['Admin'] }
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
