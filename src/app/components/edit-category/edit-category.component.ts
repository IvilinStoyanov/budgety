import { Component, DebugElement, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  data: any;

  constructor(public commonService: CommonService) {
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  edit() {

  }

  deleteTemplate(index: number, categoryID: number, type: string) {
    if (type === 'default') this.data.categoryTemplates.splice(index, 1);

    if (type === 'custom') this.data.categoryTemplatesCustom.splice(index, 1);

    this.data.totals.inc -= this.data.categories[categoryID].inc;
    this.data.totals.exp -= this.data.categories[categoryID].exp;

    let categoryIndex = this.data.categories.findIndex(c => c.id == categoryID);
    this.data.categories.splice(categoryIndex, 1);

    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.saveData(this.data);
  }

  changeColor(categoryID: number, color: string, type: string) {
    if (type === 'default') this.data.categoryTemplates[categoryID].color = color;

    if (type === 'custom') this.data.categoryTemplatesCustom[categoryID].color = color;

    this.data.categories[categoryID].color = color;

    this.commonService.saveData(this.data);
  }

}
