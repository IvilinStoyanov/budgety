import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  data: any;


  constructor(public dialog: MatDialog, public commonService: CommonService) {
    this.data = {
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
   // this.displayDailyActivies();
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
    let date =  new Date();
    let dateCreated = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();

    // Create new item based on 'inc' or 'exp' type
    newItem = {
      icon: params.category.icon,
      category: params.category.name,
      dateCreated: dateCreated,
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
      this.data.percentage = 0;
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

}
