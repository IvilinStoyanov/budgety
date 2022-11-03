import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './modules/categories-action/components/add-category/add-category.component';
import { AddColorComponent } from './modules/colors/components/add-color/add-color.component';
import { CategoryDetailComponent } from './modules/latest/components/category-detail/category-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCategoryComponent } from './modules/categories-action/components/edit-category/edit-category.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-color',
    component: AddColorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    data: { role: ['Admin'] }
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
  { path: '**', redirectTo: '', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
