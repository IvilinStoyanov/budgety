import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ITransaction } from '../../../../shared/models/interface/transaction';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { TransactionsService } from '../../../../shared/services/transactions.service';
import { MonthlyTransaction } from '../../models/monthly-transaction';

@Component({
  selector: 'app-monthly-transaction-list',
  templateUrl: './monthly-transaction-list.component.html',
  styleUrls: ['./monthly-transaction-list.component.scss']
})
export class MonthlyTransactionListComponent implements OnInit, OnDestroy {
  $destroyed = new Subject();
  monthName: string;
  monthlyIncome = 0;
  items: ITransaction[] = [];
  monthlyCategories: MonthlyTransaction = {};
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.monthName = params.month;
          const year =
            this.transactionsService.monthlyYearSelected.getFullYear();

          return combineLatest([
            this.categoriesService.getCategories(),
            this.transactionsService.getMonthlyIndividualTransactions(
              year,
              this.monthName
            )
          ]);
        }),
        takeUntil(this.$destroyed)
      )
      .subscribe(([categories, transactions]) => {
        categories.forEach(category => {
          if (category.transactionsCount > 0) {
            this.monthlyCategories[category._id] = {
              name: category.name,
              exp: 0,
              inc: 0,
              items: []
            };
          }

          transactions.forEach(transaction => {
            if (transaction._categoryId === category._id) {
              this.monthlyCategories[transaction._categoryId].items.push(
                transaction
              );

              if (transaction.type === 'exp') {
                this.monthlyCategories[transaction._categoryId].exp +=
                  transaction.value;
              }
              if (transaction.type === 'inc') {
                this.monthlyCategories[transaction._categoryId].inc +=
                  transaction.value;
                this.monthlyIncome += transaction.value;
              }

              this.items.push(transaction);
            }
          });
        });
      });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.unsubscribe();
  }
}
