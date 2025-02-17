import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', password_confirmation: '' };
  fieldErrors: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    await this.authService.register(this.user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error && error.status === 422) {
          this.fieldErrors = error.error.errors;
        } else {
          this.fieldErrors = {};
        }
      },
    });
  }
}
