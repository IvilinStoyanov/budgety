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
