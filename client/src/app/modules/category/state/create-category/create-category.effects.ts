import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as userActions from '../../../shared/state/user/user.actions';
import * as categoryAction from './create-category.actions';
import { ICategory } from '../../../../shared/models/interface/category';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { selectUser } from '../../../shared/state/user/user.selector';

@Injectable()
export class CreateCategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService,
    private router: Router,
    private notification: NotificationService,
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

  importCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryAction.createCategory),
      mergeMap(action =>
        this.categoryService.importCategory(action.category).pipe(
          map(() => {
            this.router.navigate(['/latest']);
            this.notification.success('Category successfully added');

            return categoryAction.createCategorySuccess();
          }),
          catchError(error =>
            of(categoryAction.createCategoryFailure({ error }))
          )
        )
      )
    )
  );
}
