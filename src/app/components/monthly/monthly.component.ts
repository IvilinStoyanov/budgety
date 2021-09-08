import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss'],
})
export class MonthlyComponent implements OnInit {
  data: any;
  monthlyList: any = [];

  constructor() { }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));

      if (this.data) this.createMonthlyList(this.data);
    }
  }

  createMonthlyList(data: any) {
    const months = [
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

    data.categories.forEach((element) => {
      if (element) {
        element.items.forEach(item => {
          let itemMonth = new Date(item.dateCreated).getMonth();
          let income = 0;
          let expense = 0;

          if (this.monthlyList[itemMonth] == undefined) {
            this.monthlyList[itemMonth] = [];
            this.monthlyList[itemMonth].name = months[itemMonth];
            this.monthlyList[itemMonth].income = 0;
            this.monthlyList[itemMonth].expense = 0;
          }

          if (this.monthlyList[itemMonth] !== undefined) {
            if (item.type == 'inc') income = item.value;

            if (item.type == 'exp') expense = item.value;

            this.monthlyList[itemMonth].income += income;
            this.monthlyList[itemMonth].expense += expense;
          }
        });
      }
    });
    
    this.calculateBudgetPercetange(this.monthlyList);
  }

  calculateBudgetPercetange(data: any) {
    data.forEach((element, index) => {
      let percentage = Math.round(
        (element.expense / element.income) * 100
      );
      percentage = 100 - percentage;

      if (percentage < 0) percentage = 0;

      this.monthlyList[index].budgetPercetange = percentage;
    });

  }
}
