import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'budgety';
  form: FormGroup;

  data: any = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  currentDate: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));
    }

    console.log(this.data);

    this.createForm();
    this.displayDate();
    this.calculateBudget();
  }

  createForm() {
    this.form = this.fb.group({
      type: ['inc'],
      description: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  addItem() {
    let newItem;
    let ID;
    const params = this.form.value;

    if (this.data.allItems[params.type].length > 0) {
      ID = this.data.allItems[params.type][this.data.allItems[params.type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    // Create new item based on 'inc' or 'exp' type
    if (params.type === 'exp') {
      newItem = { id: ID, description: params.description, value: params.value, type: 'exp' };
    } else if (params.type === 'inc') {
      newItem = { id: ID, description: params.description, value: params.value, type: 'inc' };
    }

    // Push it into our data structure
    this.data.allItems[params.type].push(newItem);
    // reset form
    this.form.reset();
    if (params.type === 'exp') {
    this.form.get('type').setValue('exp');
    } else {
      this.form.get('type').setValue('inc');
    }

    this.calculateBudget();
    this.calculatePercentages();
  }

  clearList(type) {
    if (type === 'exp') {
      this.data.allItems.exp = [];
      this.data.totals.exp = 0;
    } else {
      this.data.allItems.inc = [];
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
      this.data.percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);
    } else {
      this.data.percentage = -1;
    }

    localStorage.setItem('data', JSON.stringify(this.data));
  }

  calculatePercentages() {
    this.data.allItems.exp.forEach(cur => console.log(cur));
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

    this.data.allItems[type].forEach(cur => sum += cur.value);

    this.data.totals[type] = sum;
  }

  displayDate() {
    let now;
    let months;
    let currentMonth;
    let year;

    now = new Date();
    months =
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth = now.getMonth();

    year = now.getFullYear();

    this.currentDate = months[currentMonth] + ' ' + year;

  }
}

