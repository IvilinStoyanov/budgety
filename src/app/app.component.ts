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
  version: any;

  constructor(public dialog: MatDialog, public commonService: CommonService, public router: Router) {
  }

  ngOnInit() {
    this.version = parseFloat(version);
  }

  navigateHome() {
    this.router.navigate(['/latest']);
    this.commonService.currentTabIndex.next(0);
  }

  importFile(file) {
    this.commonService.saveData(file);
    window.location.reload();
  }

  onFileChange(event) {
    const fileToLoad = event.target.files[0];
    console.log(fileToLoad);
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      var textFromFileLoaded: any = fileLoadedEvent.target.result;
      var jsonResult = JSON.parse(textFromFileLoaded);
      this.importFile(jsonResult);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  exportFile() {
    var data = localStorage.getItem("data");
    var blob = new Blob([data], { type: "text/json" });
    var url = URL.createObjectURL(blob);

    var a: any = document.querySelector("#results");
    a.href = url;
    a.download = `budgety-${version}.json`;
    a.click();
  }
}
