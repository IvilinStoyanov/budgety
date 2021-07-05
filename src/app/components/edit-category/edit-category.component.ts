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

  deleteTemplate(categoryID: number, type: string) {
    if (type === 'default') this.data.categoryTemplates.splice(categoryID, 1);

    if (type === 'custom') this.data.categoryTemplatesCustom.splice(categoryID, 1);

    this.commonService.saveData(this.data);
  }

  changeColor(categoryID: number, color: string, type: string) {
    if (type === 'default') this.data.categoryTemplates[categoryID].color = color;

    if (type === 'custom') this.data.categoryTemplatesCustom[categoryID].color = color;
    
    this.data.categories[categoryID].color = color;

    this.commonService.saveData(this.data);
  }

}
