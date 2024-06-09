// yearly.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadYearlyList,
  loadYearlyListFailure,
  loadYearlyListSuccess,
  YearlyItem
} from './yearly.actions';
import { TransactionsService } from '../../../../shared/services/transactions.service';
import { ITransaction } from '../../../../shared/models/interface/transaction';

@Injectable()
export class YearlyEffects {
  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService
  ) { }

  loadYearlyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadYearlyList),
      mergeMap(({ startYear, endYear }) =>
        this.transactionsService.getYearlyTransactions(startYear, endYear).pipe(
          map((transactions: ITransaction[]) => {
            const yearlyList: { [key: number]: YearlyItem } = {};

            transactions.forEach(item => {
              const year = new Date(item.dateCreated).getFullYear();
              let income = 0;
              let expense = 0;

              if (!yearlyList[year]) {
                yearlyList[year] = {
                  name: year,
                  income: 0,
                  expense: 0,
                  budgetPercentage: 0
                };
              }

              if (item.type === 'inc') {
                income = item.value;
              }

              if (item.type === 'exp') {
                expense = item.value;
              }

              yearlyList[year].income += income;
              yearlyList[year].expense += expense;
            });

            for (const year in yearlyList) {
              const element = yearlyList[year];
              let percentage = Math.round(
                (element.expense / element.income) * 100
              );
              percentage = 100 - percentage;

              if (percentage < 0) {
                percentage = 0;
              }

              element.budgetPercentage = percentage;
            }

            return loadYearlyListSuccess({ yearlyList });
          }),
          catchError(error => of(loadYearlyListFailure({ error })))
        )
      )
    )
  );
}
