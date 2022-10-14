import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { ICategory } from 'src/app/models/interface/category';
import { Category } from 'src/app/models/category';
import * as shape from 'd3-shape';
import { ITransaction } from 'src/app/models/interface/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  data: any;
  categoryId: string;
  category: ICategory;
  transactions: ITransaction[] = [];
  viewMode: string;

  pageIndex = 0;
  pageSize = 10;
  totalPages: number = 0;


  colorScheme = { domain: ['#28B9B5', '#FF5049'] };

  days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
  curve: any = shape.curveBasis;
  chartData: any = [];
  latestCount: number = 5;
  isAxisVisible: boolean;

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
    this.viewMode = this.commonService.viewMode;

    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
      this.categoriesService.getCategoryById(this.categoryId).subscribe(category => {
        this.category = category;
        this.transactionsService.getTransactions(this.categoryId, this.pageIndex, this.pageSize).subscribe(result => {
          this.transactions = result.transactions;

          this.totalPages = result.totalPages;

          this.chartDataLatest(this.latestCount);
        });
      })
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  // sortByDate() {
  //   this.data.categories[this.categoryId].items.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  //   if (this.transactions)
  //     this.transactions.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  // }

  changePageIndex(currentPageIndex: number = 0) {
    this.pageIndex = currentPageIndex;

    this.transactionsService.getTransactions(this.categoryId, this.pageIndex, this.pageSize).subscribe(result => {
      this.transactions = result.transactions;

      this.totalPages = result.totalPages;

      this.commonService.scrollToTop();
    });
  }

  openAddItemDialog(): void {
    //let selectedCategory: any;

    // selectedCategory = this.data.categoryTemplates.find(c => c && c.id == categoryId);

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
        //  this.sortByDate();
        //  this.changePageIndex();
        this.chartDataLatest(this.latestCount);
        this.notification.success("Item successfully added");
      }
    });
  }

  addItem(params) {
    console.log(params);

    // this.setViewMode(params.type);

    this.transactionsService.createTransation(params).subscribe(transaction => {
      console.log(this.transactions);
      console.log(transaction);

      this.transactions.push(transaction);
    })

    //   let isCategoryExist = this.data.categories.findIndex(c => c && c.id == params.category.id);

    // if (isCategoryExist < 0) {
    //   let category = params.category;

    //   // initial create of category
    //   let categoryClass = new Category(category.id, category.color, 0, 0, 0, category.icon, 0, category.name, true, []);

    //   this.data.categories.push({ ...categoryClass });
    // }

    // let categoryIndex = this.data.categories.findIndex(category => category && category.id == params.category.id);

    // if (categoryIndex >= 0) {
    //   if (params.items.type === 'exp') {
    //     this.data.totals.exp += params.items.value;
    //     this.data.categories[categoryIndex].exp += params.items.value;
    //   }
    //   if (params.items.type === 'inc') {
    //     this.data.totals.inc += params.items.value;
    //     this.data.categories[categoryIndex].inc += params.items.value;
    //   }

    // create uniqueID
    //  let lastTransaction = this.data.categories[categoryIndex].items.slice(0, 1);

    //  params.items.id = lastTransaction.length > 0 ? lastTransaction[0].id + 1 : 1;

    // Push it into our data structure
    // this.data.categories[categoryIndex].items.push(params.items);

    // calculate budget
    // this.data.budget = parseFloat((this.data.totals.inc - this.data.totals.exp).toFixed(2));

    // calculate category income/expense percetanges of current budget
    // this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    //this.data = this.commonService.calculatePercentageEach(this.data);

    // this.commonService.saveData(this.data);
    // } else {
    // this.notification.danger("Not able to add category.");
    // }
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

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.commonService.viewMode = mode;

    if (mode === 'inc') this.data.categories.sort(function (a: { inc: number; }, b: { inc: number; }) { return b.inc - a.inc; });

    if (mode === 'exp') this.data.categories.sort(function (a: { exp: number; }, b: { exp: number; }) { return b.exp - a.exp; });
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
