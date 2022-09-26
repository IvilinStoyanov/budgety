import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/interface/category';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  transactions(): Observable<any[]> {
    return this.http.get<ICategory[]>('/api/transactions');
  }

  createTransaction(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions', params);
  }

}
