import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent implements OnInit {

  name: string | null = '';
  email: string | null = '';
  role: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Get user info from localStorage
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');

    // ✅ Restrict dashboard only to trainees
    if (this.role !== 'TRAINEE') {
      alert('Unauthorized access. Redirecting...');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
