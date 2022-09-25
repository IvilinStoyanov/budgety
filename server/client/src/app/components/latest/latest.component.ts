import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from 'src/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { Category } from 'src/app/models/category';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { Categories } from 'src/app/enums/categories.enum';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/services/transactions.service';
import { ICategory } from 'src/app/models/interface/category';
import { AuthService } from 'src/services/auth.service';
import { SetupCategoriesComponent } from './modals/setup-categories/setup-categories.component';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  data: any;
  transactions: ICategory[];
  viewMode: any;
  user: any;

  constructor(private dialog: MatDialog, private commonService: CommonService, private router: Router,
    public notification: NotificationService, private transactionsService: TransactionsService, private authService: AuthService) {
    this.data = {
      categories: [],
      categoryTemplates: [],
      categoryColors: null,
      totals: {
        exp: 0,
        inc: 0,
      },
      savings: 0,
      budget: 0,
      incPercentage: 0,
      expPercentage: 0,
      siteVersion: '0.0.0',
      isCreated: false
    };
  }

  ngOnInit() {
    this.user = this.authService.currentUser$.subscribe(user => {
      console.log(user);
      if (!user?.isCategoriesSet) this.openSetupCategoriesModal();
    })
    // get data from localstorage
    //  if (localStorage.getItem('data') !== null) this.data = JSON.parse(localStorage.getItem('data'));

    this.transactionsService.transactions().subscribe(transactions => {
      this.transactions = transactions;
      console.log(this.transactions);
    });

    // create initial values if none is provided
    // if (!this.data.isCreated) {
    this.createCategoryInitialValues();
    // this.createCategoryColors();

    //   this.data.isCreated = true;
    // }

    this.commonService.saveData(this.data);
    this.setViewMode('exp');

    // set viewMode to inc if there is no expenses on first load.
    if (this.data.totals.exp === 0) this.viewMode = 'inc';
  }

  openSetupCategoriesModal() {

    const dialogRef = this.dialog.open(SetupCategoriesComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notification.success("Categories successfully imported.");
      }
    });
  }

  navigateToCategory(categoryName: string, categoryID: number) {
    this.router.navigate([`/category/${categoryName}`], { queryParams: { id: categoryID }, skipLocationChange: true, replaceUrl: false });
  }

  createCategoryColors() {
    this.data.categoryColors = Object.values(CategoriesColors);
  }

  createCategoryInitialValues() {
    this.data.categoryTemplates = [
      { name: Categories.Salary, icon: 'attach_money', color: CategoriesColors.Salary, isVisible: true },
      { name: Categories.Car, icon: 'directions_car_filled', color: CategoriesColors.Car, isVisible: true },
      { name: Categories.Grocery, icon: 'shopping_cart', color: CategoriesColors.Grocery, isVisible: true },
      { name: Categories.Food, icon: 'restaurant', color: CategoriesColors.Food, isVisible: true },
      { name: Categories.Coffe, icon: 'local_cafe', color: CategoriesColors.Coffe, isVisible: true },
      { name: Categories.Haircut, icon: 'content_cut', color: CategoriesColors.Haircut, isVisible: true },
      { name: Categories.MedicalSupplies, icon: 'medication', color: CategoriesColors.MedicalSupplies, isVisible: true },
      { name: Categories.Holiday, icon: 'holiday_village', color: CategoriesColors.Holiday, isVisible: true },
      { name: Categories.Utilities, icon: 'receipt', color: CategoriesColors.Utilities, isVisible: true },
      { name: Categories.Rent, icon: 'bedroom_parent', color: CategoriesColors.Rent, isVisible: true },
      { name: Categories.LoanPayments, icon: 'credit_score', color: CategoriesColors.LoanPayments, isVisible: true }
    ];
  }

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.commonService.viewMode = mode;

    if (mode === 'inc') this.data.categories.sort(function (a: { inc: number; }, b: { inc: number; }) { return b.inc - a.inc; });

    if (mode === 'exp') this.data.categories.sort(function (a: { exp: number; }, b: { exp: number; }) { return b.exp - a.exp; });
  }

  showCategories(category: Category) {
    if (category) {
      if (this.viewMode === 'inc') {
        if (category.inc > 0) return true;

        return false;
      }
      if (this.viewMode === 'exp') {
        if (category.exp > 0) return true;

        return false;
      }
    }
  }

  openAddItemDialog(): void {
    let templates = this.data.categoryTemplates.filter(t => t.isVisible == true);

    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        category: templates,
        viewMode: this.viewMode,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addItem(result);
        this.notification.success("Item successfully added");
      }
    });
  }

  addItem(params) {
    this.setViewMode(params.items.type);

    // let isCategoryExist = this.data.categories.findIndex(c => c && c.id == params.category.id);

    // if (isCategoryExist < 0) {
    let category = params.category;

    // initial create of category
    let categoryClass = new Category(category.id, category.color, 0, 0, 0, category.icon, 0, category.name, true, []);


    // this.data.categories.push({ ...categoryClass });
    //}

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

    //   // create uniqueID
    //   let lastTransaction = this.data.categories[categoryIndex].items.slice(-1);

    //   params.items.id = lastTransaction.length > 0 ? lastTransaction[0].id + 1 : 1;

    //   // Push it into our data structure
    //   this.data.categories[categoryIndex].items.push(params.items);

    // calculate budget
    //  this.data.budget = parseFloat((this.data.totals.inc - this.data.totals.exp).toFixed(2));

    // calculate category income/expense percetanges of current budget
    // this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    //  this.data = this.commonService.calculatePercentageEach(this.data);
    categoryClass.items = params.items;
    this.transactionsService.createTransaction(categoryClass).subscribe(transaction => {
      console.log(transaction)
      this.transactions = [...this.transactions, transaction];
    });

    this.commonService.saveData(this.data);
    // }
    // else {
    //   this.notification.danger("Not able to add category.");
    // }
  }
}
