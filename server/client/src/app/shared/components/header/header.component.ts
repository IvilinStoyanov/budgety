import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';

import * as userActions from '../../../modules/shared/state/user/user.actions';
import { IUser } from '../../models/interface/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<IUser>;

  constructor(
    public router: Router,
    public commonService: CommonService,
    public authService: AuthService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
  }

  login(): void {
    window.open(`${environment.apiUrl}/auth/google`, '_self');
  }

  logout(): void {
    this.store.dispatch(userActions.logoutUser());
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    this.commonService.currentTabIndex.next(0);
  }
}
