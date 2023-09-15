import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { LatestListComponent } from './components/latest-list/latest-list.component';
import { SetupCategoriesComponent } from './components/latest-list/modals/setup-categories/setup-categories.component';
import { LatestRoutingModule } from './latest-routing.module';

@NgModule({
  declarations: [
    LatestListComponent,
    CategoryDetailComponent,
    SetupCategoriesComponent
  ],
  imports: [CommonModule, SharedModule, LatestRoutingModule]
})
export class LatestModule {}
