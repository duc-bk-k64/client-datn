import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamclassDetailComponent } from './examclass-detail.component';

describe('ExamclassDetailComponent', () => {
  let component: ExamclassDetailComponent;
  let fixture: ComponentFixture<ExamclassDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamclassDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamclassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
