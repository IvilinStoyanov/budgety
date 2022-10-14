import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.scss']
})
export class YearlyComponent implements OnInit {
  user: any;
  yearlyList: any = [];

  constructor(private authService: AuthService, private transactionsService: TransactionsService, private commonService: CommonService) { }

  ngOnInit() {
    this.authService.currentUser$
      .subscribe(user => {
        this.user = this.commonService.calculateTotalExpPercentage(user);

        this.createYearlyList();
      });
  }

  createYearlyList() {
    this.yearlyList = [];

    const startYear = new Date().getFullYear();
    const endYear = startYear - 5;

    this.transactionsService.getYearlyTransactions(startYear, endYear).subscribe(transactions => {
      transactions.forEach(item => {
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

      this.calculateBudgetPercetange(this.yearlyList);
    })


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
