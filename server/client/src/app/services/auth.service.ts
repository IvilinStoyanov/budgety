import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new ReplaySubject<any>();
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  fetchUser(): Observable<any> {
    return this.http.get('/api/current_user');
  }

  setCurrentUser(user: any) {
    console.log(user);
    this.currentUserSource.next(user);
  }

}
