import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('/api/categories');
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`api/category/${id}`);
  }

  importCategories(params): Observable<any> {
    return this.http.post('/api/categories', params);
  }

}

