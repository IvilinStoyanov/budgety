import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import { MonthlyItem } from '../../models/monthly-item';
import * as monthlyActions from './monthly.actions';

@Injectable()
export class MonthlyEffects {
  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService
  ) { }

  loadMonthlyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(monthlyActions.loadMonthlyList),
      mergeMap(({ year }) =>
        this.transactionsService.getMonthlyTransactions(year).pipe(
          map((transactions: ITransaction[]) =>
            monthlyActions.loadMonthlyListSuccess({
              monthlyList: this.calculateMonthlyList(transactions)
            })
          ),
          catchError(error =>
            of(monthlyActions.loadMonthlyListFailure({ error: error.message }))
          )
        )
      )
    )
  );

  private calculateMonthlyList(transactions: ITransaction[]): {
    [key: number]: MonthlyItem;
  } {
    const monthlyList: { [key: number]: MonthlyItem } = {};
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    transactions.forEach(item => {
      const itemMonth = new Date(item.dateCreated).getMonth();
      let income = 0;
      let expense = 0;

      if (!monthlyList[itemMonth]) {
        monthlyList[itemMonth] = {
          name: months[itemMonth],
          income: 0,
          expense: 0,
          budgetPercetange: 0
        };
      }

      const monthlyItem = monthlyList[itemMonth];

      if (item.type === 'inc') {
        income = item.value;
      } else if (item.type === 'exp') {
        expense = item.value;
      }

      monthlyItem.income += income;
      monthlyItem.expense += expense;
    });

    Object.keys(monthlyList).forEach(key => {
      const element = monthlyList[+key];
      let percentage = Math.round((element.expense / element.income) * 100);
      percentage = 100 - percentage;

      if (percentage < 0) {
        percentage = 0;
      }

      element.budgetPercetange = percentage;
    });

    return monthlyList;
  }
}
