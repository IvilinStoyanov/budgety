import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { Category } from 'src/app/models/category';
import { Categories } from 'src/app/enums/categories.enum';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  data: any;
  viewMode: any;

  constructor(public dialog: MatDialog, public commonService: CommonService, private router: Router) {
    this.data = {
      categories: [],
      categoryTemplates: [],
      categoryColors: null,
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      incPercentage: 0,
      expPercentage: 0,
    };
  }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) this.data = JSON.parse(localStorage.getItem('data'));

    // create initial values if none is provided
    //if (this.data.categoryValues.length == 0)
    this.createCategoryInitialValues();

    if (this.data.categoryColors == null) this.createCategoryColors();

    this.saveData();
    this.setViewMode('exp');

    // set viewMode to inc if there is no expenses on first load.
    if (this.data.totals.exp === 0) this.viewMode = 'inc';
  }

  navigateToCategory(categoryName: string, categoryID: number) {
    this.router.navigate([`/category/${categoryName}`], { queryParams: { id: categoryID }, skipLocationChange: true, replaceUrl: false });
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  createCategoryColors() {
    this.data.categoryColors = Object.values(CategoriesColors);
  }

  createCategoryInitialValues() {
    this.data.categoryTemplates = [
      { id: Categories.Salary, icon: 'attach_money', name: 'Salary', color: CategoriesColors.Salary },
      { id: Categories.Car, icon: 'directions_car_filled', name: 'Car', color: CategoriesColors.Car },
      { id: Categories.Grocery, icon: 'shopping_cart', name: 'Grocery', color: CategoriesColors.Grocery },
      { id: Categories.Food, icon: 'restaurant', name: 'Food & Restaurant', color: CategoriesColors.Food },
      { id: Categories.Coffe, icon: 'local_cafe', name: 'Coffe', color: CategoriesColors.Coffe },
      { id: Categories.Haircut, icon: 'content_cut', name: 'Haircut', color: CategoriesColors.Haircut },
      { id: Categories.MedicalSupplies, icon: 'medication', name: 'Medical Supplies', color: CategoriesColors.MedicalSupplies },
      { id: Categories.Holiday, icon: 'holiday_village', name: 'Holiday', color: CategoriesColors.Holiday },
      { id: Categories.Utilities, icon: 'receipt', name: 'Utilities', color: CategoriesColors.Utilities },
      { id: Categories.Rent, icon: 'bedroom_parent', name: 'Rent', color: CategoriesColors.Rent },
      { id: Categories.LoanPayments, icon: 'credit_score', name: 'Loan Payments', color: CategoriesColors.LoanPayments },
      { id: Categories.Savings, icon: 'savings', name: 'Savings', color: CategoriesColors.Savings }
    ];
  }

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.commonService.viewMode = mode;
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
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: this.data.categoryTemplates
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addItem(result);
    });
  }

  addItem(params) {
    this.setViewMode(params.items.type);
    if (this.data.categories[params.category.id] == undefined) {
      let category = params.category;

      // initial create of category
      this.data.categories[params.category.id] =
        new Category(category.id, category.color, 0, 0, 0, category.icon, 0, category.name, []);

      if (params.items.type === 'exp') {
        this.data.totals.exp += params.items.value;
        this.data.categories[params.category.id].exp += params.items.value;
      }
      if (params.items.type === 'inc') {
        this.data.totals.inc += params.items.value;
        this.data.categories[params.category.id].inc += params.items.value;
      }
    } else {
      // calculate category budget and add new item to the existing array.
      if (params.items.type === 'exp') {
        this.data.totals.exp += params.items.value;
        this.data.categories[params.category.id].exp += params.items.value;
      }
      if (params.items.type === 'inc') {
        this.data.totals.inc += params.items.value;
        this.data.categories[params.category.id].inc += params.items.value;
      }
    }

    // Push it into our data structure
    this.data.categories[params.category.id].items.push(params.items);

    // calculate budget
    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.saveData(this.data);
  }
}
