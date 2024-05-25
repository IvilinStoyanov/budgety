import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { ICategory } from 'src/app/shared/models/interface/category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import * as latest from './latest.actions';

@Injectable()
export class LatestEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService,
    private commonService: CommonService,
    private authService: AuthService,
    private transactionService: TransactionsService
  ) {}

  loadLatest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(latest.loadLatest),
      withLatestFrom(this.authService.currentUser$),
      mergeMap(([, user]) =>
        this.categoryService.getCategories().pipe(
          map((categories: ICategory[]) => {
            categories = this.commonService.calculatePercentageEach(
              categories,
              user
            );

            // TODO: use store for the user object
            this.authService.setCurrentUser(
              this.commonService.calculateTotalExpPercentage(user)
            );

            return latest.loadLatestSuccess({ categories });
          }),
          catchError(error => of(latest.loadLatestFailure({ error })))
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(latest.createTransaction),
      mergeMap(({ transaction }) =>
        this.transactionService.createTransactionGlobal(transaction).pipe(
          switchMap(response => {
            if (!response) throw new Error('Transaction creation failed');

            this.authService.setCurrentUser(
              this.commonService.calculateTotalExpPercentage(response.user)
            );

            return of(
              latest.createTransactionSuccess({
                user: response.user,
                category: response.category
              })
            );
          }),
          catchError(error => of(latest.createTransactionFailure({ error })))
        )
      )
    )
  );

  fetchCategoriesAfterTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(latest.createTransactionSuccess),
      switchMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories: ICategory[]) =>
            latest.loadLatestSuccess({ categories })
          ),
          catchError(error =>
            of(latest.loadLatestFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
