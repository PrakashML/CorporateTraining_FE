import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Assessment {
  id: string;
  courseId: string;
  passPercentage: number;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class AssessmentService {

  private baseUrl = 'http://localhost:8090/api/assessments';

  constructor(private http: HttpClient) {}

  // ✅ Get assessment by course
  getByCourse(courseId: string) {
    return this.http.get<any>(
      `${this.baseUrl}/course/${courseId}`
    );
  }

  // ✅ Create assessment
  create(courseId: string, payload: any) {
    return this.http.post<Assessment>(
      `${this.baseUrl}/course/${courseId}`,
      payload
    );
  }

  // ✅ Delete assessment
  delete(assessmentId: string) {
    return this.http.delete(
      `${this.baseUrl}/${assessmentId}`,
      { responseType: 'text' }
    );
  }
}