import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  refreshCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/token`, {withCredentials: true}).pipe(
      catchError(error => {
        console.error('Failed to get CSRF token:', error);
        return throwError(error);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {withCredentials: true}).pipe(
      map((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      }),
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {withCredentials: true}).pipe(
      map(() => {
        localStorage.removeItem('user');
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserDetails(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
