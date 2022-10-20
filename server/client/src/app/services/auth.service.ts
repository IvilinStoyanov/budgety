import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource: ReplaySubject<User>;
  readonly currentUser$: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSource = new ReplaySubject<User>(1);

    this.currentUser$ = this.currentUserSource.asObservable();
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
