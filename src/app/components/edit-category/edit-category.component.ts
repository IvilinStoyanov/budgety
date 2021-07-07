import { Component, OnInit } from '@angular/core';
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
    let category: any;
    if (type === 'default') {
      console.log(categoryID);
      // this.data.categoryTemplates.splice(index, 1);
      category = this.data.categories.find(c => c.id == categoryID);
    }

    if (type === 'custom') {
      //  this.data.categoryTemplatesCustom.splice(index, 1);
       category = this.data.categories.find(c => c.id == categoryID);
    }

    console.log(category);
    category.items.forEach(item => {
      if (item.type === 'exp') {
        this.data.totals.exp -= item.value;
      }
      if (item.type === 'inc') {
        this.data.totals.inc += item.value;
      }
    });
    
    this.data.categories[categoryID].inc = 0;
    this.data.categories[categoryID].exp = 0;

    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // calculate category income/expense percetanges of current budget
    this.data = this.commonService.calculateTotalExpPercentage(this.data);

    // calculate global income/expense percetanges of current budget
    this.data = this.commonService.calculatePercentageEach(this.data);

    //  this.commonService.saveData(this.data);
  }

  changeColor(categoryID: number, color: string, type: string) {
    if (type === 'default') this.data.categoryTemplates[categoryID].color = color;

    if (type === 'custom') this.data.categoryTemplatesCustom[categoryID].color = color;

    this.data.categories[categoryID].color = color;

    this.commonService.saveData(this.data);
  }

}
