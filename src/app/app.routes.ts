import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TraineeDashboardComponent } from './dashboard/trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from './dashboard/trainer-dashboard/trainer-dashboard';
import { AuthGuard } from './auth/auth-guard';
import { TrainerAuthGuard } from './auth/trainer-auth.guard';
import { CourseList } from './dashboard/trainer-dashboard/course-list/course-list';
import { CreateCourse } from './dashboard/trainer-dashboard/create-course/create-course';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

  // Trainee dashboard
  {
    path: 'trainee',
    component: TraineeDashboardComponent,
    canActivate: [AuthGuard]
  },

  // Trainer dashboard
  {
  path: 'trainer',
  component: TrainerDashboardComponent,
  canActivate: [TrainerAuthGuard],
  children: [
    { path: '', redirectTo: 'courses', pathMatch: 'full' }, // ✅ ADD THIS
    { path: 'courses', component: CourseList },
    { path: 'create-course', component: CreateCourse }
  ]
},

  { path: '**', redirectTo: 'login' }
];
