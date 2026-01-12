import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-course.html',
  styleUrls: ['./edit-course.css']
})
export class EditCourse implements OnInit {

  courseId!: string;

  title = '';
  description = '';
  skillLevel = '';
  durationHours!: number;

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course: Course) => {
        this.title = course.title;
        this.description = course.description;
        this.skillLevel = course.skillLevel;
        this.durationHours = course.durationHours;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load course';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  submit() {
    const payload = {
      title: this.title,
      description: this.description,
      skillLevel: this.skillLevel,
      durationHours: this.durationHours
    };

    this.courseService.updateCourse(this.courseId, payload).subscribe({
      next: () => {
        this.router.navigate(['/trainer/courses']);
      },
      error: () => {
        this.error = 'Failed to update course';
        this.cdr.detectChanges();
      }
    });
  }
}
