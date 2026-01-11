import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  loading = true;
  error = '';

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef  // Add this
  ) {}

  ngOnInit(): void {
    console.log('[CourseList] ngOnInit called');
    const trainerId = localStorage.getItem('id');
    console.log('[CourseList] trainerId:', trainerId);

    if (!trainerId) {
      this.error = 'Trainer ID not found. Please login again.';
      this.loading = false;
      this.cdr.detectChanges();  // Trigger change detection
      console.error('[CourseList] trainerId missing');
      return;
    }

    console.log('[CourseList] calling backend...');
    this.courseService.getCoursesByTrainer(trainerId).subscribe({
      next: (data) => {
        console.log('[CourseList] API response:', data);
        this.courses = data;
        this.loading = false;
        this.cdr.detectChanges();  // Trigger change detection here
      },
      error: (err) => {
        console.error('[CourseList] API error:', err);
        this.error = 'Failed to load courses';
        this.loading = false;
        this.cdr.detectChanges();  // Trigger change detection here too
      },
      complete: () => {
        console.log('[CourseList] API completed');
      }
    });
  }
}