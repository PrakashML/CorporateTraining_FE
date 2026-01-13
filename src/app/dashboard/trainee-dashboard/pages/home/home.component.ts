import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainee-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',})

  
export class TraineeHomeComponent {
  name = localStorage.getItem('name') || 'Trainee';
  email = localStorage.getItem('email') || 'trainee@example.com';
  role = localStorage.getItem('role') || 'TRAINEE';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
