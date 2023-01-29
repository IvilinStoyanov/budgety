import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LatestRoutingModule } from './latest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LatestListComponent } from './components/latest-list/latest-list.component';
import { SetupCategoriesComponent } from './components/latest-list/modals/setup-categories/setup-categories.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';


@NgModule({
  declarations: [
    LatestListComponent,
    CategoryDetailComponent,
    SetupCategoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LatestRoutingModule
  ]
})
export class LatestModule { }
