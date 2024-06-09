// monthly.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  loadMonthlyDetails,
  loadMonthlyDetailsFailure,
  loadMonthlyDetailsSuccess
} from './monthly-details.actions';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { TransactionsService } from '../../../../shared/services/transactions.service';

@Injectable()
export class MonthlyDetailsEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService
  ) { }

  loadMonthlyDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyDetails),
      switchMap(({ year, month }) =>
        combineLatest([
          this.categoriesService.getCategories(),
          this.transactionsService.getMonthlyIndividualTransactions(year, month)
        ]).pipe(
          map(([categories, transactions]) =>
            loadMonthlyDetailsSuccess({ categories, transactions })
          ),
          catchError(error => of(loadMonthlyDetailsFailure({ error })))
        )
      )
    )
  );
}
