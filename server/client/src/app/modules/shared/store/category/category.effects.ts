import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { selectUser } from 'src/app/modules/shared/store/user/user.selector';
import { ICategory } from 'src/app/shared/models/interface/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

import * as userActions from '../user/user.actions';
import * as categoryAction from './category.actions';

@Injectable()
export class LatestEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService,
    private store: Store
  ) { }

  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryAction.loadCategory),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(([, user]) =>
        this.categoryService.getCategories().pipe(
          mergeMap((categories: ICategory[]) => [
            userActions.updateUser({ user }),
            categoryAction.loadCategorySuccess({ categories })
          ]),
          catchError(error => of(categoryAction.loadCategoryFailure({ error })))
        )
      )
    )
  );
}
