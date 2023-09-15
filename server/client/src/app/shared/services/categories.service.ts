import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryInitialImportResponse } from '../../modules/latest/models/category-initial-import-response';
import { ICategory } from '../models/interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: ICategory[] = [];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/categories');
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`api/category/${id}`);
  }

  importCategories(
    categories: ICategory[]
  ): Observable<CategoryInitialImportResponse> {
    return this.http.post<CategoryInitialImportResponse>(
      '/api/categories',
      categories
    );
  }

  importCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('/api/category', category);
  }
}
