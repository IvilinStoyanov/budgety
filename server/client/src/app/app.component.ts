import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';

import * as userActions from './modules/shared/state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent {
  title = 'budgety';

  constructor(
    public authService: AuthService,
    private store: Store,
    public router: Router
  ) {
    this.store.dispatch(userActions.loadUser());
  }

  get isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }
}
