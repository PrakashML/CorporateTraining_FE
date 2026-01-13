import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-enrolled-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css']
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  userId = localStorage.getItem('id') || '';

  constructor(private enrollmentService: EnrollmentService, private courseService: CourseService) {}

  ngOnInit() {
    this.enrollmentService.getEnrollmentsByUser(this.userId).subscribe({
      next: (res) => {
        this.enrolledCourses = res;
      }
    });
  }

  
}
