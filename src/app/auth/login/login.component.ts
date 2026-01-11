import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        const role = localStorage.getItem('role');
        if (role === 'TRAINER') this.router.navigate(['/trainer']);
        else this.router.navigate(['/trainee']);
      },
      error: (err) => {
        this.error = 'Invalid credentials';
        this.loading = false;
      },
    });
  }
}
