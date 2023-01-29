import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IUser } from '../models/interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource: ReplaySubject<IUser>;
  readonly currentUser$: Observable<IUser>;

  constructor(private http: HttpClient) {

    this.currentUserSource = new ReplaySubject<IUser>(1);

    this.currentUser$ = this.currentUserSource.asObservable();
  }

  fetchUser(): Observable<IUser> {
    return this.http.get<IUser>('/api/current_user');
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  roleMatch(allowedRoles: string[], userRole: string): boolean {
    let isMatch = false;

    allowedRoles.forEach(role => {
      if (userRole === role) {
        isMatch = true;
      }
    });

    return isMatch;
  }
}
