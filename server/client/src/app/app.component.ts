import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgety';
  data: any;

  constructor(public dialog: MatDialog, public commonService: CommonService, public router: Router, private http: HttpClient,
    public authService: AuthService) {
  }

  ngOnInit() {
    // get data from localstorage
    if (localStorage.getItem('data') !== null) this.data = JSON.parse(localStorage.getItem('data'));

    this.commonService.isAvailable.subscribe(data => {
      if (data) this.data = data
    });

    this.authService.fetchUser().subscribe(user => this.authService.setCurrentUser(user));
  }

  login() {
    window.open(`${environment.apiUrl}/auth/google`, '_self');
  }

  logout() {
    this.http.get('/api/logout').subscribe(() => location.reload());
  }

  navigateHome() {
    this.router.navigate(['/']);
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
