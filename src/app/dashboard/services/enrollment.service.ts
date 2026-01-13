import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:8090/api/enrollments'; // Gateway URL

  constructor(private http: HttpClient) {}

  // ✅ Enroll a user into a course
  enroll(userId: string, courseId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { userId, courseId };
    return this.http.post(this.baseUrl, body, { headers });
  }

  // ✅ Get all enrollments for a specific user
  getEnrollmentsByUser(userId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  // ✅ Mark course as completed
  markCompleted(enrollmentId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/${enrollmentId}/complete`, {}, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
