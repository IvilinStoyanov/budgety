import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { version } from 'package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgety';
  data: any;
  version: any;
  currentDate: Date = new Date();
  
  constructor(public dialog: MatDialog, public commonService: CommonService, public router: Router) {
  }

  ngOnInit() {
    this.version = parseFloat(version);
  }

  navigateHome() {
    this.router.navigate(['/latest']);
    this.commonService.currentTabIndex.next(0);
  }

  exportFile() {
  //  window.location = "data:text/plain,Your text here";
  }

}
