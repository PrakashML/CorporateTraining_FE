import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TraineeDashboardComponent } from './dashboard/trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from './dashboard/trainer-dashboard/trainer-dashboard';
import { AuthGuard } from './auth/auth-guard';
import { TrainerAuthGuard } from './auth/trainer-auth.guard';
import { CourseList } from './dashboard/trainer-dashboard/course-list/course-list';
import { CreateCourse } from './dashboard/trainer-dashboard/create-course/create-course';
import { EditCourse } from './dashboard/trainer-dashboard/edit-course/edit-course';
import { ModuleList } from './dashboard/trainer-dashboard/course-modules/module-list/module-list';
import { CreateModule } from './dashboard/trainer-dashboard/course-modules/create-module/create-module';




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
    { path: '', redirectTo: 'courses', pathMatch: 'full' }, 
    { path: 'courses', component: CourseList },
    { path: 'create-course', component: CreateCourse },
    { path: 'courses/edit/:id', component: EditCourse },
    {
      path: 'courses/:courseId/modules',
      component: ModuleList,
      children: [
        { path: 'create', component: CreateModule }
      ]
    }
  ]
},

  { path: '**', redirectTo: 'login' }
];
