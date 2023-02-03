import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStudentComponent } from './dialog-add-student.component';

describe('DialogAddStudentComponent', () => {
  let component: DialogAddStudentComponent;
  let fixture: ComponentFixture<DialogAddStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
