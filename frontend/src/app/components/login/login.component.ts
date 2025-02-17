import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.credentials);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show error message to the user)
    }
  }
}
