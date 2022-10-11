import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor
    (
      private http: HttpClient,
      public router: Router,
      public commonService: CommonService,
      public authService: AuthService) { }

  ngOnInit() {
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
}
