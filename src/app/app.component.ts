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

  constructor(public dialog: MatDialog, public commonService: CommonService, public router: Router) {
  }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) this.data = JSON.parse(localStorage.getItem('data'));

    this.version = parseFloat(version);

    this.commonService.isAvailable.subscribe(data => {
      if (data) this.data = data
    });
  }

  navigateHome() {
    this.router.navigate(['/latest']);
    this.commonService.currentTabIndex.next(0);
  }

  selectFile() {
    var element: HTMLElement = document.querySelector("#upload");
    element.click();
  }

  onFileChange(event) {
    const fileToLoad = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      let textFromFileLoaded: any = fileLoadedEvent.target.result;
      let jsonResult = JSON.parse(textFromFileLoaded);
      this.importFile(jsonResult);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  importFile(file) {
    this.commonService.saveData(file);
    window.location.reload();
  }

  exportFile() {
    var data = localStorage.getItem("data");
    var blob = new Blob([data], { type: "text/json" });
    var url = URL.createObjectURL(blob);

    var element: any = document.querySelector("#results");
    element.href = url;
    element.download = `budgety-${new Date().toJSON().slice(0, 10)}.json`;
    element.click();
  }
}
