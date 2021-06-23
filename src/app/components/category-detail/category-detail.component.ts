import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/services/common.service';

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

  constructor(public route: ActivatedRoute, public commonService: CommonService) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.viewMode = this.commonService.viewMode;

    this.route.params.subscribe(params => {
      let id = params['id'];
      this.categoryID = id;

      if (this.data) this.category = this.data.categories[id];
    })
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

    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.saveData(this.data);
  }

  changeColor(color: string) {
    this.data.categories[this.categoryID].color = color;

    this.commonService.saveData(this.data);
  }
}
