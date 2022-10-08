import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/interface/category';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  transactions(_categoryId): Observable<any> {
    const params = {
      _categoryId: _categoryId
    };

    return this.http.get<any>('/api/transactions', { params });
  }

  createTransactionGlobal(params: any): Observable<any> {
    return this.http.post<any>('/api/transactions/global', params);
  }

}
