import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User = { id: 0, name: '', email: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (error: any) => {
        console.error('Failed to fetch user details:', error);
      }
    });
  }
}
