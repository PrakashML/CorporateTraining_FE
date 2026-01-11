import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description: string;
  skillLevel: string;
  durationHours: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8090/api/courses';

  constructor(private http: HttpClient) {}

  getCoursesByTrainer(trainerId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/trainer/${trainerId}`);
  }
}
