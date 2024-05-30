import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { categoryReducers } from './state';
import { CreateCategoryEffects } from './state/create-category/create-category.effects';

@NgModule({
  declarations: [AddCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
    NgbModule,
    StoreModule.forFeature('category', categoryReducers),
    EffectsModule.forFeature([CreateCategoryEffects])
  ]
})
export class CategoryModule {}
