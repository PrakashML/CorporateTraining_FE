import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Question {
  id: string;
  assessmentId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionsService {

  private baseUrl = 'http://localhost:8090/api/assessments';

  constructor(private http: HttpClient) {}

  // 🔹 Get assessment + questions (reuse existing API)
  getAssessmentWithQuestions(courseId: string) {
    return this.http.get<any>(
      `${this.baseUrl}/course/${courseId}`
    );
  }

  // 🔹 Add question
  addQuestion(assessmentId: string, payload: any) {
    return this.http.post<Question>(
      `${this.baseUrl}/${assessmentId}/questions`,
      payload
    );
  }

  // 🔹 Delete question
  deleteQuestion(questionId: string) {
    return this.http.delete(
      `${this.baseUrl}/${questionId}`,
      { responseType: 'text' }
    );
  }
}