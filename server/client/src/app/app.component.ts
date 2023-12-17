import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgety';

  constructor(public authService: AuthService) {
    this.authService.fetchUser().subscribe(user => {
      this.authService.setCurrentUser(user);
    });
  }
}
