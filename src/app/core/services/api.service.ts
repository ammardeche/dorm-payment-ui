import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  get<T>(path: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${path}`, { params });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${path}`, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${path}`);
  }
}
