import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  monthsList: any = [
    { name: 'january', id: 0 },
    { name: 'february', id: 1 },
    { name: 'march', id: 2 },
    { name: 'april', id: 3 },
    { name: 'may', id: 4 },
    { name: 'june', id: 5 },
    { name: 'july', id: 6 },
    { name: 'august', id: 7 },
    { name: 'september', id: 8 },
    { name: 'october', id: 9 },
    { name: 'november', id: 10 },
    { name: 'december', id: 11 }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.monthName = params['month']; 
      let currentMonth = this.monthsList.findIndex(m => m.name == params['month']);

      let data = JSON.parse(localStorage.getItem('data'));

      this.createMonthlyTransanctions(data, currentMonth)
    })
  }

  createMonthlyTransanctions(data: any, currentMonthId: number) {
    data.categories.forEach((element, categoryIndex) => {
      this.monthlyCategories.push({name: element.name, exp: 0, inc: 0, items: []});
      if (element) {
            element.items.forEach(item => {
              let monthId = new Date(item.dateCreated).getMonth();

              if (monthId == currentMonthId) {
                item.category = element.name;
                this.monthlyCategories[categoryIndex].items.push(item);

                if (item.type === 'exp') {
                  this.monthlyCategories[categoryIndex].exp += item.value;
                }
                if (item.type === 'inc') {
                 this.monthlyCategories[categoryIndex].inc += item.value;
                 this.monthlyIncome += item.value;
                }
                this.items.push(item);
              }
            });
      }
    });
    console.log(this.monthlyCategories);
  }
}
