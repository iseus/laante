import { Injectable } from '@angular/core';
import axios from 'axios-observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-Xsrf-Token';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private cookieService: CookieService) {
    if (!localStorage.getItem('token')) {
      this.getCsrfToken();
    }
  }

  private async getCsrfToken() {
    try {
      await axios.get('/token').subscribe(response => {
        const cookieValue = this.cookieService.get('XSRF-TOKEN');
        localStorage.setItem('token', cookieValue);
      });
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }
  }

  async login(credentials: any) {
    try {
      await axios.post('/login', credentials).subscribe(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigate(['/profile']);
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(user: any) {
    try {
      await axios.post('/register', user).subscribe(response => {
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await axios.post('/logout', {}, {}).subscribe(() => {
        localStorage.removeItem('user');
        const cookieValue = this.cookieService.get('XSRF-TOKEN');
        localStorage.setItem('token', cookieValue);
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
