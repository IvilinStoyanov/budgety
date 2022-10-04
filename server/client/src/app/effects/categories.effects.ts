import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { CategoriesService } from "src/services/categories.service";
import * as categoryActions from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  loadCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<categoryActions.CategoriesLoad>(categoryActions.CATEGORIES_LOAD),
        mergeMap(
          () => this.categoriesService.getCategories()
            .pipe(
              map(categories => new categoryActions.CategoriesSuccess(categories)),
              catchError(error => of(new categoryActions.CategoriesFail(error)))
            )
        )
      )
  })

  constructor(private actions$: Actions, private categoriesService: CategoriesService) {

  }
}
