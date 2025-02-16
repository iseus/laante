import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private token: string = '';

  constructor(private router: Router) {}

  async login(credentials: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/sanctum/token`, {
        ...credentials,
        device_name: 'web'
      });
      this.token = response.data;
      localStorage.setItem('token', this.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(user: any) {
    try {
      await axios.post(`${this.apiUrl}/register`, user);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
