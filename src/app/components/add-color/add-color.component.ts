import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.scss']
})
export class AddColorComponent implements OnInit {
  currentColor: string;
  data: any;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  changeColor(color: string) {
    this.currentColor = color;
  }

  handleChange($event: ColorEvent) {
    this.currentColor = $event.color.hex;
  }

  addColor() {
    if (this.data.categoryColors) this.data.categoryColors.push(this.currentColor);

    this.commonService.saveData(this.data);
  }
}
