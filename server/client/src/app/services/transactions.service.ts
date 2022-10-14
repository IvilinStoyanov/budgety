import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  monthlyYearSelected: Date = new Date();

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

  getMonthlyTransactions(year: number): Observable<ITransaction[]> {
    const params = {
      year: year
    };

    return this.http.get<ITransaction[]>('/api/transactions/monthly', { params });
  }

  getMonthlyIndividualTransactions(year: number, month: string): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(`/api/transactions/monthly/${year}/${month}`);
  }

  getYearlyTransactions(startYear: number, endYear: number): Observable<ITransaction[]> {
    const params = {
      startYear: startYear,
      endYear: endYear
    };

    return this.http.get<ITransaction[]>('/api/transactions/yearly', { params });
  }
}
