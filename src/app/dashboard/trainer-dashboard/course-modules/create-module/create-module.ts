import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModuleService } from '../../../services/course-module.service';

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-module.html',
  styleUrls: ['./create-module.css']
})
export class CreateModule implements OnInit {

  courseId!: string;

  moduleOrder!: number;
  title = '';
  videoUrl = '';
  durationMinutes!: number;

  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: CourseModuleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ IMPORTANT: get courseId from parent route
    this.route.parent?.paramMap.subscribe(params => {
      this.courseId = params.get('courseId')!;
      console.log('[CreateModule] courseId:', this.courseId);
    });
  }

  submit() {
    this.error = '';

    if (!this.title || !this.moduleOrder) {
      this.error = 'Module order and title are required';
      this.cdr.detectChanges();
      return;
    }

    const payload = {
      courseId: this.courseId,
      moduleOrder: this.moduleOrder,
      title: this.title,
      videoUrl: this.videoUrl,
      durationMinutes: this.durationMinutes
    };

    console.log('[CreateModule] payload:', payload);

    this.loading = true;
    this.cdr.detectChanges();

    this.moduleService.createModule(payload).subscribe({
      next: () => {
        // go back to module list
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create module';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
