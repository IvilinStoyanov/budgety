import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgety';
  currentDate: Date = new Date();
  
  constructor(public dialog: MatDialog, public commonService: CommonService) {
  }

  ngOnInit() {
  }
}
