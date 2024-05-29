import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';

export const loadCategory = createAction('[Category] Load Category');

export const loadCategorySuccess = createAction(
  '[Category] Load Category Success',
  props<{ categories: ICategory[] }>()
);

export const loadCategoryFailure = createAction(
  '[Category] Load Category Failure',
  props<{ error: string }>()
);

export const createCategory = createAction(
  '[Category] Create Category',
  props<{ category: ICategory }>()
);

export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{ category: ICategory }>
);

export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{ error: string }>()
);
