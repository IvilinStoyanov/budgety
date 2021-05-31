import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';
import { AddItemComponent } from './components/add-item/add-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgety';
  data: any;
  currentDate: string;

  constructor(public dialog: MatDialog, public commonService: CommonService) {
    this.data = {
      items: [],
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      percentage: -1,
    };
  }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));
    }
    console.log(this.data);

    this.displayDate();
    this.displayDailyActivies();
    this.calculateBudget();
  }

  displayDailyActivies() {
    this.data.items.forEach((element, index, object) => {
      if (!this.commonService.isDateToday(element.dateCreated))
        object.splice(index, 1);
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addItem(result);
    });
  }

  addItem(params) {
    let newItem;
    let ID;

    // if (this.data.items[params.type].length > 0) {
    //   ID =
    //     this.data.items[params.type][this.data.items[params.type].length - 1]
    //       .id + 1;
    // } else {
    //   ID = 0;
    // }
    console.log(params);
    // Create new item based on 'inc' or 'exp' type
    newItem = {
      icon: params.category.icon,
      category: params.category.name,
      dateCreated: new Date(),
      description: params.description,
      value: params.value,
      type: params.type,
    };

    // Push it into our data structure
    this.data.items.push(newItem);

    this.calculateBudget();
    this.calculatePercentages();
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
    } else {
      this.data.percentage = -1;
    }

    localStorage.setItem('data', JSON.stringify(this.data));
  }

  calculatePercentages() {
    //this.data.items.exp.forEach((cur) => console.log(cur));
  }

  calculatePercentageEach(totalIncome) {
    //   if (totalIncome > 0) {
    //     this.percentage = Math.round((this.value / totalIncome) * 100);
    // } else {
    //     this.percentage = -1;
    // }
  }

  calculateTotal(type) {
    let sum = 0;

    this.data.items.forEach((item) => {
      if (type === item.type) sum += item.value
    });

    this.data.totals[type] = sum;
  }

  displayDate() {
    let now;
    let months;
    let currentMonth;
    let year;

    now = new Date();
    months = [
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
      'December',
    ];
    currentMonth = now.getMonth();

    year = now.getFullYear();

    this.currentDate = months[currentMonth] + ' ' + year;
  }
}
