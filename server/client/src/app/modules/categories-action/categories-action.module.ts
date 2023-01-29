import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesActionRoutingModule } from './categories-action-routing.module';

import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesActionRoutingModule

  ]
})
export class CategoriesActionModule { }
