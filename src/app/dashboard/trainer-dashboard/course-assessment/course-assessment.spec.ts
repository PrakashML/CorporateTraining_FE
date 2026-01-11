import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssessment } from './course-assessment';

describe('CourseAssessment', () => {
  let component: CourseAssessment;
  let fixture: ComponentFixture<CourseAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAssessment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
