import { Action } from '@ngrx/store';
import { ICategory } from '../models/interface/category';

export const CATEGORIES_LOAD = "[CATEGORIES] Load"
export const CATEGORIES_SUCCESS = "[CATEGORIES] Success"
export const CATEGORIES_FAIL = "[CATEGORIES] Fail"

export class CategoriesLoad implements Action {
  readonly type = CATEGORIES_LOAD;

  constructor() { }
}

export class CategoriesSuccess implements Action {
  readonly type = CATEGORIES_SUCCESS;

  constructor(public payload: Array<ICategory>) { }
}

export class CategoriesFail implements Action {
  readonly type = CATEGORIES_FAIL;

  constructor(public payload: Error) { }
}

export type CategoriesActions = CategoriesLoad | CategoriesSuccess | CategoriesFail;
