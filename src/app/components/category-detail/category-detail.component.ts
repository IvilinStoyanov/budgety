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
  category: any;
  viewMode: string;

  constructor(public route: ActivatedRoute, public commonService: CommonService) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.viewMode = this.commonService.viewMode;

    this.route.params.subscribe(params => {
      let id = params['id'];

      if (this.data) this.category = this.data.categories[id];

      console.log(this.category);
    })
  }

}
