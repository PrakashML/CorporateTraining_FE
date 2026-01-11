import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TraineeDashboardComponent } from './dashboard/trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from './dashboard/trainer-dashboard/trainer-dashboard';
import { AuthGuard } from './auth/auth-guard';
import { TrainerAuthGuard } from './auth/trainer-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

  // Trainee
  {
    path: 'trainee',
    component: TraineeDashboardComponent,
    canActivate: [AuthGuard]
  },

  // Trainer
  {
    path: 'trainer',
    component: TrainerDashboardComponent,
    canActivate: [TrainerAuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];
