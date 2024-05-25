import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/models/interface/category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import { TransactionGlobalResponse } from '../models/transaction-global-response';
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
            this.authService.setCurrentUser(
              this.commonService.calculateUserBudget(user)
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
          map((response: TransactionGlobalResponse) => {
            this.authService.setCurrentUser(
              this.commonService.calculateUserBudget(response.user)
            );

            return latest.createTransactionSuccess({
              category: response.category
            });
          }),
          catchError(error => of(latest.createTransactionFailure({ error })))
        )
      )
    )
  );
}
