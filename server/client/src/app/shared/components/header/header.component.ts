import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private http: HttpClient,
    public router: Router,
    public commonService: CommonService,
    public authService: AuthService
  ) {}

  login(): void {
    window.open(`${environment.apiUrl}/auth/google`, '_self');
  }

  logout(): void {
    this.http.get('/api/logout').subscribe(() => this.router.navigate(['/']));
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    this.commonService.currentTabIndex.next(0);
  }
}
