import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.scss']
})
export class YearlyComponent implements OnInit {
  data: any;
  yearlyList: any = [];
  
  constructor() { }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));

      if (this.data) this.createyearlyList(this.data);
    }
  }

  createyearlyList(data: any) {
    this.yearlyList = [];

    data.categories.forEach((element) => {
      if (element) {
        element.items.forEach(item => {
            let year = new Date(item.dateCreated).getFullYear();
            let income = 0;
            let expense = 0;

            if (this.yearlyList[year] == undefined) {
              this.yearlyList[year] = [];
              this.yearlyList[year].name = year;
              this.yearlyList[year].income = 0;
              this.yearlyList[year].expense = 0;
            }

            if (this.yearlyList[year] !== undefined) {
              if (item.type == 'inc') income = item.value;

              if (item.type == 'exp') expense = item.value;

              this.yearlyList[year].income += income;
              this.yearlyList[year].expense += expense;
            }
          
        });
      }
    });

    this.calculateBudgetPercetange(this.yearlyList);
  }

  calculateBudgetPercetange(data: any) {
    data.forEach((element, index) => {
      let percentage = Math.round(
        (element.expense / element.income) * 100
      );
      percentage = 100 - percentage;

      if (percentage < 0) percentage = 0;

      this.yearlyList[index].budgetPercetange = percentage;
    });
  }

}
