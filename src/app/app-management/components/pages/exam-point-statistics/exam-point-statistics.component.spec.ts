import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPointStatisticsComponent } from './exam-point-statistics.component';

describe('ExamPointStatisticsComponent', () => {
  let component: ExamPointStatisticsComponent;
  let fixture: ComponentFixture<ExamPointStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPointStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamPointStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
