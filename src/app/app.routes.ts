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
import { EditModule } from './dashboard/trainer-dashboard/course-modules/edit-module/edit-module';



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

      // Courses
      { path: 'courses', component: CourseList },
      { path: 'courses/create', component: CreateCourse },
      { path: 'courses/edit/:id', component: EditCourse },

      // Modules (Nested)
      {
        path: 'courses/:courseId/modules',
        component: ModuleList,
        children: [
          { path: 'create', component: CreateModule },

          // ✅ Phase 5.3 - Edit Module
          { path: 'edit/:moduleId', component: EditModule }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

