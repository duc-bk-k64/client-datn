import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyStaffComponent } from './reply-staff.component';

describe('ReplyStaffComponent', () => {
  let component: ReplyStaffComponent;
  let fixture: ComponentFixture<ReplyStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
