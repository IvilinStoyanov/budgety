import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryTransactionsResponse } from '../../modules/latest/models/category-transactions-response';
import { TransactionGlobalResponse } from '../../modules/latest/models/transaction-global-response';
import { TransactionResponse } from '../../modules/latest/models/transaction-response';
import { ITransaction } from '../models/interface/transaction';
import { IUser } from '../models/interface/User';

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
  ): Observable<CategoryTransactionsResponse> {
    const params = {
      _categoryId: categoryId,
      pageIndex,
      pageSize
    };

    return this.http.get<CategoryTransactionsResponse>('/api/transactions', {
      params
    });
  }

  createTransactionGlobal(
    transaction: ITransaction
  ): Observable<TransactionGlobalResponse> {
    return this.http.post<TransactionGlobalResponse>(
      '/api/transactions/global',
      transaction
    );
  }

  createTransation(transaction: ITransaction): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      '/api/transactions',
      transaction
    );
  }

  deleteTransaction(
    _id: string,
    type: string,
    value: number,
    _categoryId: string
  ): Observable<IUser> {
    const params = {
      _id,
      type,
      value,
      _categoryId
    };

    return this.http.delete<IUser>('/api/transactions', { params });
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
    return this.http.get<ITransaction[]>(
      `/api/transactions/monthly/${year}/${month}`
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
