import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  data: any;
  viewMode: any;

  constructor(public dialog: MatDialog, public commonService: CommonService) {
    this.data = {
      categories: [],
      items: [],
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      percentage: 0,
    };
  }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));
    }

    this.saveData();
    this.setViewMode('exp');
    // set viewMode to inc if there is no expenses on first load.
    if (this.data.totals.exp === 0) this.viewMode = 'inc';
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.data));
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
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addItem(result);
    });
  }

  addItem(params) {
    this.setViewMode(params.items.type);
    if (this.data.categories[params.category.id] == undefined) {
      // initial create of category

      let category = params.category;
      this.data.categories[params.category.id] =
        new Category(
          category.id,
          category.color,
          category.exp,
          category.expPercentage,
          category.incPercentage,
          category.icon,
          category.inc,
          category.name,
          []);

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
    this.calculateTotalExpPercentage();
    // calculate global income/expense percetanges of current budget
    this.calculatePercentageEach();

    this.saveData();
  }

  clearList(type) {
    if (type === 'exp') {
      this.data.items.exp = [];
      this.data.totals.exp = 0;
    } else {
      this.data.items.inc = [];
      this.data.totals.inc = 0;
    }
    localStorage.setItem('data', JSON.stringify(this.data));
    this.calculateBudget();
  }

  calculateBudget() {
    // Calculate total income and expenses
    this.calculateTotal('exp');
    this.calculateTotal('inc');

    // Calculate the budget: income - expenses
    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // Calculate the percentage of income that we spent
    if (this.data.totals.inc > 0) {
      this.data.percentage = Math.round(
        (this.data.totals.exp / this.data.totals.inc) * 100
      );
      if (this.data.percentage > 100) this.data.percentage = 100;
    } else if (this.data.budget < 0) {
      this.data.percentage = 100;
    } else {
      this.data.percentage = 0;
    }
  }

  calculatePercentages() {
    //this.data.items.exp.forEach((cur) => console.log(cur));
  }

  calculatePercentageEach() {
    // calculate category expense percetange of current budget
    this.data.categories.forEach((category, index) => {
      if (category) {
        if (category.exp > 0 && this.data.totals.inc > 0) category.expPercentage = Math.round((category.exp / this.data.totals.inc) * 100);
        if (category.inc > 0) category.incPercentage = Math.round((category.inc / this.data.totals.inc) * 100);
      }
    });
  }

  calculateTotalExpPercentage() {
    // Calculate the percentage of income that we spent
    if (this.data.totals.inc > 0) {
      this.data.percentage = Math.round(
        (this.data.totals.exp / this.data.totals.inc) * 100
      );
      if (this.data.percentage > 100) this.data.percentage = 100;
    } else if (this.data.budget < 0) {
      this.data.percentage = 100;
    } else {
      this.data.percentage = 0;
    }
  }

  calculateTotal(type) {
    let sum = 0;

    this.data.items.forEach((item) => {
      if (type === item.type) sum += item.value;
    });

    this.data.totals[type] = sum;
  }
}
