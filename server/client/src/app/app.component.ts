import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'budgety';

  constructor(public authService: AuthService, private router: Router) {
    this.authService.fetchUser().subscribe(user => {
      this.authService.setCurrentUser(user);

     // if (user) this.router.navigate(['/latest']);
    }
    );
  }
}
