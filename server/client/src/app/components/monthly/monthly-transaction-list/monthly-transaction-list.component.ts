import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-monthly-transaction-list',
  templateUrl: './monthly-transaction-list.component.html',
  styleUrls: ['./monthly-transaction-list.component.scss']
})
export class MonthlyTransactionListComponent implements OnInit {
  monthName: any;
  monthlyIncome: number = 0;
  items: any[] = [];
  monthlyCategories: any[] = [];
  panelOpenState: boolean;



  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.monthName = params['month'];

      const year = this.transactionsService.monthlyYearSelected.getFullYear();

      this.createMonthlyTransanctions(year, this.monthName)
    })
  }

  createMonthlyTransanctions(year: number, monthName: string) {
    this.categoriesService.getCategories().subscribe(categories => {
      this.transactionsService.getMonthlyIndividualTransactions(year, monthName).subscribe(transactions => {
        categories.forEach((category, categoryIndex) => {
          if (category.transactionsCount > 0)
            this.monthlyCategories[category._id] = [{ name: category.name, exp: 0, inc: 0, items: [] }];

            transactions.forEach(transaction => {
              if (transaction._categoryId === category._id) {
                this.monthlyCategories[transaction._categoryId][0].items.push(transaction);

                if (transaction.type === 'exp') {
                  this.monthlyCategories[transaction._categoryId][0].exp += transaction.value;
                }
                if (transaction.type === 'inc') {
                  this.monthlyCategories[transaction._categoryId][0].inc += transaction.value;
                  this.monthlyIncome += transaction.value;
                }
                this.items.push(transaction);
              }
            });
        });
        console.log(this.monthlyCategories);
      })
    })
  }
}
