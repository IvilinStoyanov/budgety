import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

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

  onToggle(event, categoryID) {
    let categoryTemplateIndex = this.data.categoryTemplates.findIndex(category => category && category.id == categoryID);
    let categoryIndex = this.data.categories.findIndex(category => category && category.id == categoryID);

    if (categoryTemplateIndex >= 0) this.data.categoryTemplates[categoryTemplateIndex].isVisible = event.checked;
    if (categoryIndex >= 0) this.data.categories[categoryIndex].isVisible = event.checked;

    this.commonService.saveData(this.data);
  }

  deleteTemplate(index: number, categoryID: number) {
    this.data.categoryTemplates.splice(index, 1);

    let categoryIndex = this.data.categories.findIndex(category => category && category.id == categoryID);
    let category = this.data.categories.find(category => category && category.id == categoryID);

    if (category) {
      this.data.totals.inc -= category.inc;
      this.data.totals.exp -= category.exp;
      this.data.categories.splice(categoryIndex, 1);
    }

    this.data.budget = parseFloat((this.data.totals.inc - this.data.totals.exp).toFixed(2));

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    //this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.isAvailable.next(this.data);
    this.commonService.saveData(this.data);

    // redirect to home page if all categories are deleted
    if (this.data.categoryTemplates.length == 0 && this.data.categoryTemplatesCustom.length == 0)
      this.commonService.navigateTo('latest');
  }

  changeColor(categoryID: number, color: string) {
    let categoryTemplateIndex = this.data.categoryTemplates.findIndex(category => category && category.id == categoryID);
    let categoryIndex = this.data.categories.findIndex(category => category && category.id == categoryID);

    if (categoryTemplateIndex >= 0) this.data.categoryTemplates[categoryTemplateIndex].color = color;
    if (categoryIndex >= 0) this.data.categories[categoryIndex].color = color;

    this.commonService.saveData(this.data);
  }

}
