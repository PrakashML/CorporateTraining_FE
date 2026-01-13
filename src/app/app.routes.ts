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
import { CourseAssessment } from './dashboard/trainer-dashboard/course-assessment/course-assessment';
import { AssessmentQuestions } from './dashboard/trainer-dashboard/course-assessment/questions/questions';
import { TraineeHomeComponent } from './dashboard/trainee-dashboard/pages/home/home.component';
import { CoursesComponent } from './dashboard/trainee-dashboard/pages/courses/courses.component';
import { EnrolledCoursesComponent } from './dashboard/trainee-dashboard/pages/enrolled-courses/enrolled-courses.component';
import { AssessmentsComponent } from './dashboard/trainee-dashboard/pages/assessments/assessments.component';
import { CertificationsComponent } from './dashboard/trainee-dashboard/pages/certifications/certifications.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

  // Trainee dashboard
  {
    path: 'trainee',
    component: TraineeDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TraineeHomeComponent }, // 🏠 Default home screen
      { path: 'home', component: TraineeHomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'enrolled', component: EnrolledCoursesComponent },
      { path: 'assessments', component: AssessmentsComponent },
      { path: 'certifications', component: CertificationsComponent }
    ]
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
          { path: 'edit/:moduleId', component: EditModule }
        ]
      },

      // Assessment (Nested)
      {
        path: 'courses/:courseId/assessment',
        component: CourseAssessment,
        children: [
          {
            path: 'questions',
            component: AssessmentQuestions
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];