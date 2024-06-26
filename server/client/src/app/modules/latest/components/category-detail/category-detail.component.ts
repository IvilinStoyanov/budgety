import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import * as shape from 'd3-shape';
import { combineLatest, of, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { IUser } from 'src/app/shared/models/interface/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import { AddItemComponent } from '../../../../shared/components/add-item/add-item.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryTransactionsResponse } from '../../models/category-transactions-response';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  categoryId: string;
  category: ICategory;
  transactions: ITransaction[] = [];
  viewMode: string;
  pageIndex = 0;
  pageSize = 10;
  length = 0;
  // colorScheme = { domain: ['#28B9B5', '#FF5049'] };
  // curve: any = shape.curveBasis;
  chartData: any = [];
  latestCount = 5;
  isAxisVisible: boolean;
  $destroyed = new Subject();

  constructor(
    public route: ActivatedRoute,
    public commonService: CommonService,
    public notification: NotificationService,
    public router: Router,
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(params => {
          this.categoryId = params.id;

          return this.categoriesService.getCategoryById(this.categoryId);
        }),
        tap(category => (this.category = category)),
        switchMap(category =>
          this.transactionsService.getTransactions(
            category._id,
            this.pageIndex,
            this.pageSize
          )
        ),
        tap(result => {
          this.transactions = result.transactions;

          this.length = result.length;
        }),
        takeUntil(this.$destroyed)
      )
      .subscribe(() => {
        this.chartDataLatest(this.latestCount);
      });

    this.viewMode = this.commonService.viewMode;
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.unsubscribe();
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  changePageIndex(currentPageIndex = 0): void {
    this.pageIndex = currentPageIndex;

    this.transactionsService
      .getTransactions(this.categoryId, this.pageIndex, this.pageSize)
      .subscribe(result => {
        this.transactions = result.transactions;

        this.length = result.length;

        this.commonService.scrollToTop();
      });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        categories: [this.category],
        viewMode: this.viewMode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addItem(result);
      }
    });
  }

  addItem(params: ITransaction): void {
    this.transactionsService
      .createTransation(params)
      .pipe(
        switchMap(transaction => {
          if (transaction) {
            return combineLatest([
              this.authService.fetchUser(),
              this.categoriesService.getCategoryById(this.categoryId),
              this.transactionsService.getTransactions(
                params._categoryId,
                0,
                10
              )
            ]).pipe(
              map(([user, category, transaction]) => ({
                user,
                category,
                transaction
              }))
            );
          }

          return of(null);
        }),
        take(1)
      )
      .subscribe(
        (result: {
          user: IUser;
          category: ICategory;
          transaction: CategoryTransactionsResponse;
        }) => {
          if (result) {
            this.authService.setCurrentUser(result.user);
            this.category = result.category;
            this.transactions = result.transaction.transactions;
            this.chartDataLatest(this.latestCount);

            this.category.expPercentage = Math.round(
              (this.category.exp / this.category.inc) * 100
            );
            this.category.incPercentage = 100 - this.category.expPercentage;

            this.notification.success('Item successfully added');
          }
        }
      );
  }

  openConfirmDialog(item: ITransaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        item
      }
    });

    dialogRef.afterClosed().subscribe((transaction: ITransaction) => {
      if (transaction) {
        this.deleteItem(transaction);
      }
    });
  }

  deleteItem(transaction: ITransaction): void {
    this.transactionsService
      .deleteTransaction(
        transaction._id,
        transaction.type,
        transaction.value,
        transaction._categoryId
      )
      .subscribe((user: IUser) => {
        if (user) {
          const transactionIndex = this.transactions.findIndex(
            t => t._id === transaction._id
          );
          this.transactions.splice(transactionIndex, 1);

          this.notification.success('Item successfully deleted.');

          this.chartDataLatest(this.latestCount);

          this.authService.setCurrentUser(user);

          // return to the latest page if there is no more transactions
          if (this.transactions.length === 0) {
            this.router.navigate(['/latest']);
          }
        }
      });
  }

  chartDataLatest(count: number): void {
    this.isAxisVisible = false;
    this.latestCount = count;

    const incData = { name: 'inc', series: [] };
    const expData = { name: 'exp', series: [] };

    const latestTransactions = this.transactions.slice(0, count);

    latestTransactions.forEach((element, index) => {
      const day = new Date(element.dateCreated).getDate();
      const month = new Date(element.dateCreated).getMonth();

      const item = {
        value: element.value,
        name: `${index + 1}.${day}/${month + 1}`
      };

      if (element.type === 'inc') {
        incData.series.push(item);
      }
      if (element.type === 'exp') {
        expData.series.push(item);
      }
    });

    this.chartData = [incData, expData];
  }

  // chartDataWeekly() {
  //   this.isAxisVisible = true;

  //   let incData = { name: 'inc', series: [] };
  //   let expData = { name: 'exp', series: [] };

  //   let curr = new Date;
  //   let first = curr.getDate() - curr.getDay() + 1; // first day of the current week
  //   let last = first + 6; // last day of the current weeek

  //   let firstday = new Date(curr.setDate(first)).valueOf();
  //   let lastday = new Date(curr.setDate(last)).valueOf();

  //   this.category.items.forEach(element => {
  //     let day = new Date(element.dateCreated).valueOf();
  //     if (firstday <= day && day <= lastday) {
  //       let dayName = this.days[new Date(element.dateCreated).getDay()];
  //       let item = { value: element.value, name: dayName };

  //       let dayIndex = new Date(element.dateCreated).getDay();

  //       if (element.type == 'exp') {
  //         if (expData.series[dayIndex] == undefined) {
  //           expData.series[dayIndex] = item;
  //         } else {
  //           expData.series[dayIndex].value += item.value;
  //         }
  //       }

  //       if (element.type == 'inc') {
  //         if (incData.series[dayIndex] == undefined) {
  //           incData.series[dayIndex] = item;
  //         } else {
  //           incData.series[dayIndex].value += item.value;
  //         }
  //       }
  //     }
  //   });

  //   incData.series = incData.series.filter(e => e != null);
  //   expData.series = expData.series.filter(e => e != null);

  //   this.chartData = [incData, expData];
  // }
}
