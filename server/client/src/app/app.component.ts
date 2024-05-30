import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';

import * as userActions from './modules/shared/store/user/user.actions';

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
