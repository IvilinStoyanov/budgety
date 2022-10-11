import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(_categoryId: string, pageIndex: number, pageSize: number): Observable<any> {
    const params = {
      _categoryId: _categoryId,
      pageIndex: pageIndex,
      pageSize: pageSize
    };

    return this.http.get<any>('/api/transactions', { params });
  }

  createTransactionGlobal(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions/global', params);
  }

  createTransation(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions', params);
  }

  deleteTransaction(_id: string, type: string, value: number, _categoryId: string): Observable<any> {
    const params = {
      _id: _id,
      type: type,
      value: value,
      _categoryId: _categoryId
    };

    return this.http.delete<any>('/api/transactions', { params });
  }
}
