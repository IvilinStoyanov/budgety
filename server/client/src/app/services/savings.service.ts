import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/interface/User';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  constructor(private http: HttpClient) { }

  updateSavings(savings: number): Observable<IUser> {
    const params = {
      savings: savings
    }

    return this.http.post<IUser>('api/savings', params)
  }
}
