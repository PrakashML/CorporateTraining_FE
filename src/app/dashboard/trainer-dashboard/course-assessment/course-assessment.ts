import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AssessmentService, Assessment } from './course-assessment.service';

@Component({
  standalone: true,
  selector: 'app-course-assessment',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './course-assessment.html',
  styleUrls: ['./course-assessment.css']
})
export class CourseAssessment implements OnInit {

  courseId!: string;

  assessment: Assessment | null = null;
  questions: any[] = [];

  passPercentage = 70;

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AssessmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    console.log('[Assessment] courseId:', this.courseId);
    this.loadAssessment();
  }

  // ---------------- Load Assessment ----------------
  loadAssessment() {
    this.loading = true;
    this.error = '';

    console.log('[Assessment] Loading assessment...');

    this.service.getByCourse(this.courseId).subscribe({
      next: (res) => {
        console.log('[Assessment] Loaded:', res);

        this.assessment = res.assessment;
        this.questions = res.questions || [];

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.warn('[Assessment] Load failed:', err);

        // ✅ 404 → No assessment exists → show Create UI
        if (err.status === 404) {
          this.assessment = null;
        } else {
          this.error = 'Unable to load assessment';
        }

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ---------------- Create Assessment ----------------
  createAssessment() {
    const payload = {
      passPercentage: this.passPercentage
    };

    console.log('[Assessment] Creating assessment...', payload);

    this.service.create(this.courseId, payload).subscribe({
      next: (assessment) => {
        alert('Assessment created successfully');
        this.assessment = assessment;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Failed to create assessment');
      }
    });
  }

  // ---------------- Delete Assessment ----------------
  deleteAssessment() {
    if (!this.assessment) return;
    if (!confirm('Delete this assessment?')) return;

    console.log('[Assessment] Deleting assessment:', this.assessment.id);

    this.service.delete(this.assessment.id).subscribe({
      next: () => {
        alert('Assessment deleted');
        this.assessment = null;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Delete failed');
      }
    });
  }

  // ---------------- Navigate to Questions ----------------
  openQuestions() {
    console.log('[Assessment] Current route:', this.route.snapshot.url);
    console.log('[Assessment] CourseId:', this.courseId);
    console.log('[Assessment] Navigating to questions...');
    
    this.router.navigate(['questions'], { relativeTo: this.route })
      .then(success => console.log('[Assessment] Navigation success:', success))
      .catch(err => console.error('[Assessment] Navigation error:', err));
  }
}