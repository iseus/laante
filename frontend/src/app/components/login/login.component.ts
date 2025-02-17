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
  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    await this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/profile']);
      },
      error: (error: any) => {
        if (error && error.status === 422) {
          this.fieldErrors = error.error.errors;
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          this.fieldErrors = {};
        }
      },
    });
  }
}
