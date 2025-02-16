import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', password_confirmation: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.user);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message to the user)
    }
  }
}
