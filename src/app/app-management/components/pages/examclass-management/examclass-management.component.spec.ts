import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamclassManagementComponent } from './examclass-management.component';

describe('ExamclassManagementComponent', () => {
  let component: ExamclassManagementComponent;
  let fixture: ComponentFixture<ExamclassManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamclassManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamclassManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
