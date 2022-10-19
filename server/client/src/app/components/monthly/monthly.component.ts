import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss'],
})
export class MonthlyComponent implements OnInit {
  user: any;
  monthlyList: any = [];
  dateForm: FormGroup;

  constructor
    (
      private fb: FormBuilder,
      private authService: AuthService,
      private commonService: CommonService,
      private transactionsService: TransactionsService,
    ) {
    this.dateForm = this.fb.group({
      year: new FormControl(new Date())
    });
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe(user => {
        this.user = this.commonService.calculateTotalExpPercentage(user);

        this.createMonthlyList();
      });
  }

  chosenYearHandler(chosenDate: any, datepicker: MatDatepicker<any>) {
    datepicker.close();

    this.dateForm.get('year').setValue(chosenDate);
    this.transactionsService.monthlyYearSelected = chosenDate;

    this.createMonthlyList(chosenDate);
  }

  createMonthlyList(date: Date = new Date()) {
    this.monthlyList = [];

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

    const year = date.getFullYear();

    this.transactionsService.getMonthlyTransactions(year).subscribe(transactions => {
      transactions.forEach(item => {
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

      this.calculateBudgetPercetange(this.monthlyList);
    });


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
