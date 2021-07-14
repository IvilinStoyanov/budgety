import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from 'src/services/notification.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  data: any;
  categoryID: number;
  category: any;
  viewMode: string;

  days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
  curve: any = shape.curveBasis;
  chartData: any = [];

  saleData = [
    {
      "name": "Monday",
      "series": [
        {
          "name": "2010",
          "value": 0,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "2000",
          "value": 45986,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "1990",
          "value": 37060,
          "extra": {
            "code": "us"
          }
        }
      ]
    },
    {
      "name": "United Kingdom",
      "series": [
        {
          "name": "2010",
          "value": 36240,
          "extra": {
            "code": "uk"
          }
        },
        {
          "name": "2000",
          "value": 32543,
          "extra": {
            "code": "uk"
          }
        },
        {
          "name": "1990",
          "value": 26424,
          "extra": {
            "code": "uk"
          }
        }
      ]
    }
  ];

  constructor(public route: ActivatedRoute, public commonService: CommonService, public notification: NotificationService,
    public router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.viewMode = this.commonService.viewMode;

    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.categoryID = id;

      if (this.data) this.category = this.data.categories.find(category => category && category.id == id);

      let weeklyActivity = this.category.items.slice(Math.max(this.category.items.length - 7, 0));

      let incData = { name: 'inc', series: [] };
      let expData = { name: 'exp', series: [] };

      weeklyActivity.forEach(element => {
        let dayName = this.days[new Date(element.dateCreated).getDay()];
        let item = { value: element.value, name: dayName };

        if (element.type == 'inc') {
            incData.series.push(item);
        } else {
            expData.series.push(item);
        }

        
      });
      this.chartData = [incData, expData];
      console.log(this.chartData);
    })
  }

  openConfirmDialog(item: any, index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        item: { item: item, index: index }
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(result.item, result.index);
        this.notification.success("Item successfully deleted.");
      }
    });
  }

  deleteItem(item: any, index: number) {
    this.data.categories[this.categoryID].items.splice(index, 1);

    // calculate total budget
    if (item.type === 'inc') {
      this.data.categories[this.categoryID].inc -= item.value;
      this.data.totals.inc -= item.value;
    }

    if (item.type === 'exp') {
      this.data.categories[this.categoryID].exp -= item.value;
      this.data.totals.exp -= item.value;
    }

    this.data.budget = parseFloat(this.data.totals.inc.toFixed(2)) - parseFloat(this.data.totals.exp.toFixed(2));

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.saveData(this.data);

    this.notification.danger('Item successfully deleted');

    if (this.data.categories[this.categoryID].items.length === 0) this.router.navigate(['/latest']);
  }

  changeColor(color: string) {
    this.data.categories[this.categoryID].color = color;

    this.commonService.saveData(this.data);
  }
}
