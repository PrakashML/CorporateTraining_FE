import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  enrolledIds: string[] = [];
  loading = true;
  userId = localStorage.getItem('id') || '';

  constructor(private courseService: CourseService, private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.loading = false;
        this.loadEnrollments();
      },
      error: () => (this.loading = false)
    });
  }

  loadEnrollments() {
    if (!this.userId) return;
    this.enrollmentService.getEnrollmentsByUser(this.userId).subscribe({
      next: (res) => {
        this.enrolledIds = res.map((r: any) => r.courseId);
      }
    });
  }

  enroll(courseId: string) {
    if (this.enrolledIds.includes(courseId)) return;
    this.enrollmentService.enroll(this.userId, courseId).subscribe({
      next: () => {
        this.enrolledIds.push(courseId);
        alert('Enrolled!!!');
      },
      error: () => alert('Enrollment failed.')
    });
  }
}
