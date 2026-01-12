import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModuleService, CourseModule } 
  from '../../../services/course-module.service';

@Component({
  selector: 'app-edit-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-module.html',
  styleUrls: ['./edit-module.css']
})
export class EditModule {

  courseId!: string;
  moduleId!: string;

  moduleOrder!: number;
  title = '';
  videoUrl = '';
  durationMinutes!: number;

  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private moduleService: CourseModuleService
  ) {
    // ✅ Parent route gives courseId
    this.courseId = this.route.parent?.snapshot.paramMap.get('courseId')!;

    // ✅ Current route gives moduleId
    this.moduleId = this.route.snapshot.paramMap.get('moduleId')!;

    this.loadModule();
  }

  // ---------------- Load Module ----------------
  loadModule() {
    this.loading = true;
    this.error = '';

    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (module: CourseModule) => {
        this.moduleOrder = module.moduleOrder;
        this.title = module.title;
        this.videoUrl = module.videoUrl;
        this.durationMinutes = module.durationMinutes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load module failed', err);
        this.error = 'Failed to load module data';
        this.loading = false;
      }
    });
  }

  // ---------------- Update Module ----------------
  update() {
    this.error = '';

    const payload = {
      moduleOrder: this.moduleOrder,
      title: this.title,
      videoUrl: this.videoUrl,
      durationMinutes: this.durationMinutes
    };

    this.moduleService.updateModule(this.moduleId, payload).subscribe({
      next: () => {
        alert('Module updated successfully');

        // ✅ Navigate back to module list
        this.router.navigate([
          '/trainer/courses',
          this.courseId,
          'modules'
        ]);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.error = 'Update failed. Please try again.';
      }
    });
  }
}
