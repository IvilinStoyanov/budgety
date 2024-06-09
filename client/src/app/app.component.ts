import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as userActions from './modules/shared/state/user/user.actions';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgety';

  constructor(public authService: AuthService, private store: Store) {
    this.store.dispatch(userActions.loadUser());
  }
}
