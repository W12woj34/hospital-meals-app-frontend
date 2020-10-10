import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementWorkerDetailsComponent } from './patient-movement-worker-details.component';

describe('PatientMovementWorkerDetailsComponent', () => {
  let component: PatientMovementWorkerDetailsComponent;
  let fixture: ComponentFixture<PatientMovementWorkerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMovementWorkerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementWorkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
