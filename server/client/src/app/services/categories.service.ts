import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: ICategory[] = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/categories');
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`api/category/${id}`);
  }

  importCategories(params: any): Observable<any> {
    return this.http.post<any>('/api/categories', params);
  }

  importCategory(params: any): Observable<ICategory> {
    return this.http.post<ICategory>('/api/category', params);
  }
}

