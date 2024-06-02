import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { TransactionsService } from '../../../../shared/services/transactions.service';
import { MonthlyTransaction } from '../../models/monthly-transaction';
import { loadMonthlyDetails } from '../../state/monthly-details/monthly-details.actions';
import {
  selectMonthlyCategories,
  selectMonthlyIncome
} from '../../state/monthly-details/monthly-details.selector';

@Component({
  selector: 'app-monthly-transaction-list',
  templateUrl: './monthly-transaction-list.component.html',
  styleUrls: ['./monthly-transaction-list.component.scss']
})
export class MonthlyTransactionListComponent implements OnInit, OnDestroy {
  monthlyCategories$: Observable<MonthlyTransaction>;
  monthlyIncome$: Observable<number>;
  monthName: string;
  $destroy: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private store: Store
  ) {
    this.monthlyCategories$ = this.store.select(selectMonthlyCategories);
    this.monthlyIncome$ = this.store.select(selectMonthlyIncome);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.monthName = params.month;

          const year =
            this.transactionsService.monthlyYearSelected.getFullYear();

          return of(
            this.store.dispatch(
              loadMonthlyDetails({ month: params.month, year: year })
            )
          );
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
