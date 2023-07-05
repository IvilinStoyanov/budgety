import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITransaction } from '../models/interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  monthlyYearSelected: Date = new Date();

  constructor(private http: HttpClient) {}

  getTransactions(
    categoryId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    const params = {
      categoryId,
      pageIndex,
      pageSize
    };

    return this.http.get<any>('/api/transactions', { params });
  }

  createTransactionGlobal(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions/global', params);
  }

  createTransation(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions', params);
  }

  deleteTransaction(
    id: string,
    type: string,
    value: number,
    categoryId: string
  ): Observable<any> {
    const params = {
      id,
      type,
      value,
      categoryId
    };

    return this.http.delete<any>('/api/transactions', { params });
  }

  getMonthlyTransactions(year: number): Observable<ITransaction[]> {
    const params = {
      year
    };

    return this.http.get<ITransaction[]>('/api/transactions/monthly', {
      params
    });
  }

  getMonthlyIndividualTransactions(
    year: number,
    month: string
  ): Observable<ITransaction[]> {
    return this.http
      .get<ITransaction[]>(`/api/transactions/monthly/${year}/${month}`)
      .pipe(
        map((transactions: ITransaction[]) => {
          transactions.forEach((transaction: ITransaction) => {
            const date = new Date(transaction.dateCreated);

            transaction.dateCreated = date
              .toISOString()
              .substring(0, date.toISOString().length - 1);
          });

          return transactions;
        })
      );
  }

  getYearlyTransactions(
    startYear: number,
    endYear: number
  ): Observable<ITransaction[]> {
    const params = {
      startYear,
      endYear
    };

    return this.http.get<ITransaction[]>('/api/transactions/yearly', {
      params
    });
  }
}
