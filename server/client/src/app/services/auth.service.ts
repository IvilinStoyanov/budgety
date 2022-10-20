import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource: BehaviorSubject<User>;
  readonly currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSource = new BehaviorSubject<User>(null);

    this.currentUser$ = this.currentUserSource.asObservable();
  }

  get currentUser(): User {
    return this.currentUserSource.getValue();
  }

  fetchUser(): Observable<User> {
    return this.http.get<User>('/api/current_user');
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  roleMatch(allowedRoles: string[], userRole: string): boolean {
    let isMatch = false;

    allowedRoles.forEach(role => {
      if (userRole === role) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
