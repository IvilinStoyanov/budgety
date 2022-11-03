import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent } from '../../../../components/common/confirm-dialog/confirm-dialog.component';
import { AddItemComponent } from '../../../../components/add-item/add-item.component';
import { ICategory } from 'src/app/models/interface/category';
import * as shape from 'd3-shape';
import { ITransaction } from 'src/app/models/interface/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  totalPages: number = 0;
  colorScheme = { domain: ['#28B9B5', '#FF5049'] };
  curve: any = shape.curveBasis;
  chartData: any = [];
  latestCount: number = 5;
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
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(params => {
          this.categoryId = params['id'];

          return this.categoriesService.getCategoryById(this.categoryId);
        }),
        tap(category => this.category = category),
        switchMap(category => {
          return this.transactionsService.getTransactions(category._id, this.pageIndex, this.pageSize);
        }),
        tap(result => {
          console.log(result);
          this.transactions = result.transactions;

          this.totalPages = result.totalPages;
        }),
        takeUntil(this.$destroyed))
      .subscribe(() => {
        this.chartDataLatest(this.latestCount);
      });

    this.viewMode = this.commonService.viewMode;
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.unsubscribe();
  }

  counter(i: number) {
    return new Array(i);
  }

  changePageIndex(currentPageIndex: number = 0) {
    this.pageIndex = currentPageIndex;

    this.transactionsService.getTransactions(this.categoryId, this.pageIndex, this.pageSize).subscribe(result => {
      this.transactions = result.transactions;

      this.totalPages = result.totalPages;

      this.commonService.scrollToTop();
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        categories: this.commonService.categoryTemplates,
        // selectedCategory: selectedCategory,
        viewMode: this.viewMode,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addItem(result);
        this.chartDataLatest(this.latestCount);
        this.notification.success("Item successfully added");
      }
    });
  }

  addItem(params) {
    this.transactionsService.createTransation(params).subscribe(transaction => {
      this.transactions.push(transaction);
    })
  }

  openConfirmDialog(item: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        item: item
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(result);
      }
    });
  }

  deleteItem(transaction: any) {
    this.transactionsService.deleteTransaction(transaction._id, transaction.type, transaction.value, transaction._categoryId)
      .subscribe(result => {
        if (result) {
          let transactionIndex = this.transactions.findIndex(t => t._id === transaction._id);
          this.transactions.splice(transactionIndex, 1);

          this.notification.success("Item successfully deleted.");

          this.chartDataLatest(this.latestCount);

          this.authService.setCurrentUser(result.user);

          // return to the latest page if there is no more transactions
          if (this.transactions.length === 0) this.router.navigate(['/latest']);
        }
      });
  }

  chartDataLatest(count: number) {
    this.isAxisVisible = false;
    this.latestCount = count;

    let incData = { name: 'inc', series: [] };
    let expData = { name: 'exp', series: [] };

    let latestTransactions = this.transactions.slice(0, count);

    latestTransactions.forEach((element, index) => {
      let day = new Date(element.dateCreated).getDate();
      let month = new Date(element.dateCreated).getMonth();

      let item = { value: element.value, name: `${index + 1}.${day}/${month + 1}` };

      if (element.type == 'inc') incData.series.push(item);
      if (element.type == 'exp') expData.series.push(item);
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
