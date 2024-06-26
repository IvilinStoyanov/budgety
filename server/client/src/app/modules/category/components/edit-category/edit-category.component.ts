import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  data: any;

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  onToggle(event, categoryId: string): void {
    const categoryTemplateIndex = this.data.categoryTemplates.findIndex(
      category => category && category.id === categoryId
    );
    const categoryIndex = this.data.categories.findIndex(
      category => category && category.id === categoryId
    );

    if (categoryTemplateIndex >= 0) {
      this.data.categoryTemplates[categoryTemplateIndex].isVisible =
        event.checked;
    }
    if (categoryIndex >= 0) {
      this.data.categories[categoryIndex].isVisible = event.checked;
    }

    this.commonService.saveData(this.data);
  }

  deleteTemplate(index: number, categoryId: string): void {
    this.data.categoryTemplates.splice(index, 1);

    const categoryIndex = this.data.categories.findIndex(
      category => category && category.id === categoryId
    );
    const category = this.data.categories.find(
      category => category && category.id === categoryId
    );

    if (category) {
      this.data.totals.inc -= category.inc;
      this.data.totals.exp -= category.exp;
      this.data.categories.splice(categoryIndex, 1);
    }

    this.data.budget = parseFloat(
      (this.data.totals.inc - this.data.totals.exp).toFixed(2)
    );

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateUserBudget(this.data);

    // calculate global income/expense percetanges of current budget
    // this.data = this.commonService.calculatePercentageEach(this.data);

    this.commonService.isAvailable.next(this.data);
    this.commonService.saveData(this.data);

    // redirect to home page if all categories are deleted
    if (
      this.data.categoryTemplates.length === 0 &&
      this.data.categoryTemplatesCustom.length === 0
    ) {
      this.commonService.navigateTo('latest');
    }
  }

  changeColor(categoryId: string, color: string): void {
    const categoryTemplateIndex = this.data.categoryTemplates.findIndex(
      category => category && category.id === categoryId
    );
    const categoryIndex = this.data.categories.findIndex(
      category => category && category.id === categoryId
    );

    if (categoryTemplateIndex >= 0) {
      this.data.categoryTemplates[categoryTemplateIndex].color = color;
    }
    if (categoryIndex >= 0) {
      this.data.categories[categoryIndex].color = color;
    }

    this.commonService.saveData(this.data);
  }
}
