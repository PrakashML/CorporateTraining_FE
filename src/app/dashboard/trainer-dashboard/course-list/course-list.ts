import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ ADD THIS
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // ✅ REQUIRED for routerLink
  ],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  loading = true;
  error = '';

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const trainerId = localStorage.getItem('id');

    if (!trainerId) {
      this.error = 'Trainer ID not found. Please login again.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.courseService.getCoursesByTrainer(trainerId).subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load courses';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  deleteCourse(courseId: string) {
  const confirmed = confirm(
    'Are you sure?\nDeleting this course may affect modules, assessments, and trainees.'
  );

  if (!confirmed) {
    return;
  }

  this.loading = true;
  this.cdr.detectChanges();

  this.courseService.deleteCourse(courseId).subscribe({
    next: () => {
      // Remove deleted course from UI (no full reload)
      this.courses = this.courses.filter(c => c.id !== courseId);
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to delete course';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

}
