import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
