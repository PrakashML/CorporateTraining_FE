import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import {
  CourseModuleService,
  CourseModule
} from '../../../services/course-module.service';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-list.html',
  styleUrls: ['./module-list.css']
})
export class ModuleList implements OnInit, OnDestroy {

  courseId!: string;
  modules: CourseModule[] = [];
  loading = true;
  error = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: CourseModuleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get courseId from route params
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.courseId = params.get('courseId')!;
      console.log('[ModuleList] courseId:', this.courseId);
      this.loadModules();
    });

    // ✅ Listen for navigation events to refresh when coming back from create
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      // Only reload if we're on the module list route (not the create route)
      const currentUrl = event.urlAfterRedirects;
      if (currentUrl.includes('/modules') && !currentUrl.includes('/create')) {
        console.log('[ModuleList] Reloading modules after navigation');
        this.loadModules();
      }
    });
  }

  loadModules() {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.moduleService.getModulesByCourse(this.courseId).subscribe({
      next: (data) => {
        // sort by moduleOrder
        this.modules = data.sort(
          (a, b) => a.moduleOrder - b.moduleOrder
        );
        this.loading = false;
        console.log('[ModuleList] Loaded modules:', this.modules);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[ModuleList] Error loading modules:', err);
        this.error = 'Failed to load modules';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  deleteModule(moduleId: string) {
  if (!confirm('Are you sure you want to delete this module?')) return;

  this.moduleService.deleteModule(moduleId).subscribe({
    next: () => {
      alert('Module deleted successfully');
      this.loadModules();   // refresh list
    },
    error: (err) => {
      console.error('[ModuleList] Delete failed:', err);
      alert('Failed to delete module');
    }
  });
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}