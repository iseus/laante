import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private csrfToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.getCsrfToken();
  }

  private getCsrfToken() {
    this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true }).subscribe(() => {
      this.csrfToken = this.getCookie('XSRF-TOKEN');
    });
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({
        'X-XSRF-TOKEN': this.csrfToken || ''
      }),
      withCredentials: true
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({
        'X-XSRF-TOKEN': this.csrfToken || ''
      }),
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'X-XSRF-TOKEN': this.csrfToken || ''
      }),
      withCredentials: true
    }).pipe(
      tap(() => {
        this.csrfToken = null;
      })
    );
  }
}
