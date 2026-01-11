import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService, Question } from './questions.service';

@Component({
  standalone: true,
  selector: 'app-assessment-questions',
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class AssessmentQuestions implements OnInit {

  courseId!: string;
  assessmentId!: string;

  questions: Question[] = [];
  loading = true;
  error = '';

  // Form fields
  questionText = '';
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  correctOption = 'A';

  constructor(
    private route: ActivatedRoute,
    private service: QuestionsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ✅ FIXED: Try to get courseId from route hierarchy
    // Start from current route and traverse up until we find courseId
    let currentRoute: ActivatedRoute | null = this.route;
    
    while (currentRoute) {
      const courseId = currentRoute.snapshot.paramMap.get('courseId');
      if (courseId) {
        this.courseId = courseId;
        break;
      }
      currentRoute = currentRoute.parent;
    }
    
    // Alternative simpler approach - get from the full route path
    if (!this.courseId) {
      // Navigate up to get the assessment route, then its parent
      this.courseId = this.route.parent?.parent?.snapshot.paramMap.get('courseId')!;
    }
    
    console.log('[Questions] courseId:', this.courseId);
    console.log('[Questions] Current route:', this.route.snapshot.url);
    console.log('[Questions] Parent route:', this.route.parent?.snapshot.url);
    console.log('[Questions] Parent.Parent route:', this.route.parent?.parent?.snapshot.url);
    
    if (!this.courseId) {
      console.error('[Questions] ERROR: courseId is null!');
      this.error = 'Failed to load course ID from route';
      this.loading = false;
      return;
    }
    
    this.loadQuestions();
  }

  // ---------------- Load ----------------
  loadQuestions() {
    this.loading = true;
    this.error = '';

    console.log('[Questions] Loading questions for course:', this.courseId);

    this.service.getAssessmentWithQuestions(this.courseId).subscribe({
      next: (res) => {
        console.log('[Questions] Loaded:', res);
        this.assessmentId = res.assessment.id;
        this.questions = res.questions || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Questions] Load failed:', err);
        this.error = 'Failed to load questions';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ---------------- Add ----------------
  addQuestion() {
    if (!this.questionText.trim()) return alert('Question required');

    const payload = {
      questionText: this.questionText,
      optionA: this.optionA,
      optionB: this.optionB,
      optionC: this.optionC,
      optionD: this.optionD,
      correctOption: this.correctOption
    };

    console.log('[Questions] Adding question:', payload);

    this.service.addQuestion(this.assessmentId, payload).subscribe({
      next: (q) => {
        console.log('[Questions] Question added:', q);
        this.questions.push(q);
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Questions] Add failed:', err);
        alert('Failed to add question');
      }
    });
  }

  // ---------------- Delete ----------------
  deleteQuestion(id: string) {
    if (!confirm('Delete this question?')) return;

    console.log('[Questions] Deleting question:', id);

    this.service.deleteQuestion(id).subscribe({
      next: () => {
        console.log('[Questions] Question deleted');
        this.questions = this.questions.filter(q => q.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Questions] Delete failed:', err);
        alert('Delete failed');
      }
    });
  }

  resetForm() {
    this.questionText = '';
    this.optionA = '';
    this.optionB = '';
    this.optionC = '';
    this.optionD = '';
    this.correctOption = 'A';
  }
}