import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuardGuard } from './shared/guards/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'latest',
    loadChildren: () =>
      import('./modules/latest/latest.module').then(m => m.LatestModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'monthly',
    loadChildren: () =>
      import('./modules/monthly/monthly.module').then(m => m.MonthlyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'yearly',
    loadChildren: () =>
      import('./modules/yearly/yearly.module').then(m => m.YearlyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories-action',
    loadChildren: () =>
      import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'colors',
    loadChildren: () =>
      import('./modules/colors/colors.module').then(m => m.ColorsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
    canActivate: [AuthGuard, RoleGuardGuard],
    data: { role: ['Admin'] }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
