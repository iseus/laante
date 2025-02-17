import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  async logout() {
    await this.authService.logout().subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      }
    });
  }
}
