import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new ReplaySubject<User>();
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

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
