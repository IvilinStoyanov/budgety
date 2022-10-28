import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/interface/user';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  constructor(private http: HttpClient) { }

  updateSavings(savings: number): Observable<User> {
    const params = {
      savings: savings
    }

    return this.http.post<User>('api/savings', params)
  }
}
