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

  colorScheme = { domain: ['#28B9B5', '#FF5049'] };

  days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
  curve: any = shape.curveBasis;
  chartData: any = [];

  constructor(public route: ActivatedRoute, public commonService: CommonService, public notification: NotificationService,
    public router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.viewMode = this.commonService.viewMode;

    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.categoryID = this.data.categories.findIndex(category => category && category.id == id);

      if (this.data) this.category = this.data.categories.find(category => category && category.id == id);

      this.category.items.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

      // TODO: Use later 
      // let weeklyActivity = this.category.items.slice(Math.max(this.category.items.length - 7, 0));

      let incData = { name: 'inc', series: [] };
      let expData = { name: 'exp', series: [] };

      this.category.items.forEach(element => {
        let dayName = this.days[new Date(element.dateCreated).getDay()];
        let item = { value: element.value, name: dayName };

        let dayIndex = new Date(element.dateCreated).getDay();

        if (element.type == 'exp') {
          if (expData.series[dayIndex] == undefined) {
            expData.series[dayIndex] = item;
          } else {
            expData.series[dayIndex].value += item.value;
          }
        }

        if (element.type == 'inc') {
          if (incData.series[dayIndex] == undefined) {
            incData.series[dayIndex] = item;
          } else {
            incData.series[dayIndex].value += item.value;
          }
        }

      });

      incData.series = incData.series.filter(e => e != null);
      expData.series = expData.series.filter(e => e != null);

      this.chartData = [incData, expData];
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
}
