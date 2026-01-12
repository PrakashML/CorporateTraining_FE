import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-course.html',
  styleUrls: ['./create-course.css']
})
export class CreateCourse {

  title = '';
  description = '';
  skillLevel = '';
  durationHours: number | null = null;

  loading = false;
  error = '';
  success = '';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  submit() {
    this.error = '';
    this.success = '';

    const trainerId = localStorage.getItem('id');
    if (!trainerId) {
      this.error = 'Trainer ID not found. Please login again.';
      return;
    }

    if (!this.title || !this.skillLevel || !this.durationHours) {
      this.error = 'Please fill all required fields';
      return;
    }

    const payload = {
      title: this.title,
      description: this.description,
      skillLevel: this.skillLevel,
      durationHours: this.durationHours
    };

    this.loading = true;

    this.courseService.createCourse(payload, trainerId).subscribe({
      next: () => {
        this.success = 'Course created successfully';
        this.loading = false;

        // Redirect back to course list
        this.router.navigate(['/trainer/courses']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create course';
        this.loading = false;
      }
    });
  }
}
