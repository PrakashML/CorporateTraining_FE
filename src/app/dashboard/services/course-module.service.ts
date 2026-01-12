import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourseModule {
  id: string;
  courseId: string;
  moduleOrder: number;
  title: string;
  videoUrl: string;
  durationMinutes: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseModuleService {

  private baseUrl = 'http://localhost:8090/api/modules';

  constructor(private http: HttpClient) {}

  getModulesByCourse(courseId: string): Observable<CourseModule[]> {
    return this.http.get<CourseModule[]>(
      `${this.baseUrl}/course/${courseId}`
    );
  }
  createModule(payload: any) {
    console.log(payload);
  return this.http.post(this.baseUrl, payload);
}
getModuleById(moduleId: string) {
  return this.http.get<CourseModule>(
    `${this.baseUrl}/${moduleId}`
  );
}

updateModule(moduleId: string, payload: any) {
  return this.http.put(
    `${this.baseUrl}/${moduleId}`,
    payload
  );
}
deleteModule(moduleId: string) {
  return this.http.delete(
    `${this.baseUrl}/${moduleId}`,
    { responseType: 'text' } 
  );
}


}
