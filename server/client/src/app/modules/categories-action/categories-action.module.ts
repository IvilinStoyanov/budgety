import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesActionRoutingModule } from './categories-action-routing.module';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

@NgModule({
  declarations: [AddCategoryComponent, EditCategoryComponent],
  imports: [CommonModule, SharedModule, CategoriesActionRoutingModule]
})
export class CategoriesActionModule {}
