import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementWorkerPasswordChangeComponent } from './patient-movement-worker-password-change.component';

describe('PatientMovementWorkerPasswordChangeComponent', () => {
  let component: PatientMovementWorkerPasswordChangeComponent;
  let fixture: ComponentFixture<PatientMovementWorkerPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMovementWorkerPasswordChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementWorkerPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
