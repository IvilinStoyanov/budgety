import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { IUser } from '../models/interface/User';
import { Endpoints } from '../enums/endpoints.enum';

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
    return this.http.get<IUser>(`/api/${Endpoints.CURRENT_USER}`);
  }

  setCurrentUser(user: IUser): void {
    this.currentUserSource.next(user);
  }

  logout(): Observable<void> {
    return this.http.get<void>(`/api/${Endpoints.LOGOUT}`);
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
