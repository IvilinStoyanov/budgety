import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';
import { ICategory } from 'src/app/shared/models/interface/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import * as userActions from '../../shared/state/user/user.actions';
import { TransactionGlobalResponse } from '../models/transaction-global-response';
import * as latestActions from './latest.actions';

@Injectable()
export class LatestEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService,
    private transactionService: TransactionsService,
    private notificationService: NotificationService,
    private store: Store
  ) {}

  loadLatest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(latestActions.loadLatest),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(([, user]) =>
        this.categoryService.getCategories().pipe(
          mergeMap((categories: ICategory[]) => [
            userActions.updateUser({ user }),
            latestActions.loadLatestSuccess({ categories })
          ]),
          catchError(error => of(latestActions.loadLatestFailure({ error })))
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(latestActions.createTransaction),
      mergeMap(({ transaction }) =>
        this.transactionService.createTransactionGlobal(transaction).pipe(
          mergeMap((response: TransactionGlobalResponse) => [
            userActions.updateUser({ user: response.user }),
            latestActions.createTransactionSuccess({
              category: response.category
            })
          ]),
          catchError(error =>
            of(latestActions.createTransactionFailure({ error }))
          )
        )
      )
    )
  );

  createTransactionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(latestActions.createTransactionSuccess),
        tap(() => {
          this.notificationService.success('Item successfully added');
        })
      ),
    { dispatch: false }
  );
}
