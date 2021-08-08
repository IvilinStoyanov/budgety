import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from 'src/services/notification.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { Category } from 'src/app/models/category';
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
  latestCount: number = 5;
  isAxisVisible: boolean;

  constructor(public route: ActivatedRoute, public commonService: CommonService, public notification: NotificationService,
    public router: Router, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.viewMode = this.commonService.viewMode;

    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.categoryID = this.data.categories.findIndex(category => category && category.id == id);

      if (this.data) this.category = this.data.categories.find(category => category && category.id == id);

      this.sortByDate();

      this.chartDataLatest(this.latestCount);
    });
  }

  sortByDate() {
    this.category.items.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  }

  openAddItemDialog(categoryID?: number): void {
    let selectedCategory: any;
    let templates = this.data.categoryTemplates.filter(t => t.isVisible == true);

    if (categoryID) selectedCategory = this.data.categoryTemplates.find(c => c && c.id == categoryID);

    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        category: templates,
        selectedCategory: selectedCategory,
        viewMode: this.viewMode,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addItem(result);
        this.sortByDate();
        this.notification.success("Item successfully added");
      }
    });
  }

  addItem(params) {
    this.setViewMode(params.items.type);

    let isCategoryExist = this.data.categories.findIndex(c => c && c.id == params.category.id);

    if (isCategoryExist < 0) {
      let category = params.category;

      // initial create of category
      let categoryClass = new Category(category.id, category.color, 0, 0, 0, category.icon, 0, category.name, true, []);

      this.data.categories.push({ ...categoryClass });
    }

    let categoryIndex = this.data.categories.findIndex(category => category && category.id == params.category.id);

    if (categoryIndex >= 0) {
      if (params.items.type === 'exp') {
        this.data.totals.exp += params.items.value;
        this.data.categories[categoryIndex].exp += params.items.value;
      }
      if (params.items.type === 'inc') {
        this.data.totals.inc += params.items.value;
        this.data.categories[categoryIndex].inc += params.items.value;
      }

      // Push it into our data structure
      this.data.categories[categoryIndex].items.push(params.items);

      // calculate budget
      this.data.budget = this.data.totals.inc - this.data.totals.exp;

      // calculate category income/expense percetanges of current budget
      this.data = this.commonService.calculateTotalExpPercentage(this.data);

      // calculate global income/expense percetanges of current budget
      this.data = this.commonService.calculatePercentageEach(this.data);

      // update chart with the new item inside
      this.sortByDate();
      this.chartDataLatest(this.latestCount);

      this.commonService.saveData(this.data);
    } else {
      this.notification.danger("Not able to add category.");
    }
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

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.commonService.viewMode = mode;
  }

  chartDataLatest(count: number) {
    this.isAxisVisible = false;
    this.latestCount = count;

    let incData = { name: 'inc', series: [] };
    let expData = { name: 'exp', series: [] };

    let latestTransactions = this.category.items.slice(0, count);
    latestTransactions.reverse();

    latestTransactions.forEach((element, index) => {
      let day = new Date(element.dateCreated).getDate();
      let month = new Date(element.dateCreated).getMonth();

      let item = { value: element.value, name: `${index + 1}.${day}/${month + 1}` };

      if (element.type == 'inc') incData.series.push(item);
      if (element.type == 'exp') expData.series.push(item);
    });

    this.chartData = [incData, expData];
  }

  chartDataWeekly() {
    this.isAxisVisible = true;

    let incData = { name: 'inc', series: [] };
    let expData = { name: 'exp', series: [] };

    let curr = new Date;
    let first = curr.getDate() - curr.getDay() + 1; // first day of the current week
    let last = first + 6; // last day of the current weeek

    let firstday = new Date(curr.setDate(first)).valueOf();
    let lastday = new Date(curr.setDate(last)).valueOf();

    this.category.items.forEach(element => {
      let day = new Date(element.dateCreated).valueOf();
      if (firstday <= day && day <= lastday) {
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
      }
    });

    incData.series = incData.series.filter(e => e != null);
    expData.series = expData.series.filter(e => e != null);

    this.chartData = [incData, expData];
  }
}
