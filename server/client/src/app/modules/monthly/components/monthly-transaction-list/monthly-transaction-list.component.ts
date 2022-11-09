import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-monthly-transaction-list',
  templateUrl: './monthly-transaction-list.component.html',
  styleUrls: ['./monthly-transaction-list.component.scss']
})
export class MonthlyTransactionListComponent implements OnInit, OnDestroy {
  $destroyed = new Subject();
  monthName: any;
  monthlyIncome: number = 0;
  items: any[] = [];
  monthlyCategories: any[] = [];
  panelOpenState: boolean = false;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.monthName = params['month'];
        const year = this.transactionsService.monthlyYearSelected.getFullYear();

        return combineLatest([this.categoriesService.getCategories(), this.transactionsService.getMonthlyIndividualTransactions(year, this.monthName)]);
      }),
      takeUntil(this.$destroyed)
    ).subscribe(
      ([categories, transactions]) => {
        categories.forEach(category => {
          if (category.transactionsCount > 0)
            this.monthlyCategories[category._id] = [{ name: category.name, exp: 0, inc: 0, items: [] }];

          transactions.forEach(transaction => {
            if (transaction._categoryId === category._id) {
              this.monthlyCategories[transaction._categoryId][0].items.push(transaction);

              if (transaction.type === 'exp') {
                this.monthlyCategories[transaction._categoryId][0].exp += transaction.value;
              }
              if (transaction.type === 'inc') {
                this.monthlyCategories[transaction._categoryId][0].inc += transaction.value;
                this.monthlyIncome += transaction.value;
              }
              this.items.push(transaction);
            }
          });
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.unsubscribe();
  }
}
