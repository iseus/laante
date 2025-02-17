import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
  ) {}

  refreshCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/token`).pipe(
      catchError(error => {
        console.error('Failed to get CSRF token:', error);
        return throwError(error);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        return response;
      }),
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, null).pipe(
      map(() => {
        localStorage.clear();
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
