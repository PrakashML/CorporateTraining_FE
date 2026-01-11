import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TraineeDashboardComponent } from './dashboard/trainee-dashboard/trainee-dashboard.component';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'trainee', component: TraineeDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
