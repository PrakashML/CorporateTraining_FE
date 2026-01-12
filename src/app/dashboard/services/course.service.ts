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
  createCourse(course: any, trainerId: string) {
  return this.http.post(
    `${this.baseUrl}/create?trainerId=${trainerId}`,
    course
  );
  }
  getCourseById(courseId: string) {
  return this.http.get<Course>(`${this.baseUrl}/${courseId}`);
}

updateCourse(courseId: string, payload: any) {
  return this.http.put(`${this.baseUrl}/${courseId}`, payload);
}
deleteCourse(courseId: string) {
  return this.http.delete(
    `${this.baseUrl}/${courseId}`,
    { responseType: 'text' }
  );
}


}
