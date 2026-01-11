import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModule } from './create-module';

describe('CreateModule', () => {
  let component: CreateModule;
  let fixture: ComponentFixture<CreateModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
