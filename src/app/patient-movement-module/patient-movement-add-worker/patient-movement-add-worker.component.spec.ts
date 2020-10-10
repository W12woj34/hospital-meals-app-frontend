import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementAddWorkerComponent } from './patient-movement-add-worker.component';

describe('PatientMovementAddWorkerComponent', () => {
  let component: PatientMovementAddWorkerComponent;
  let fixture: ComponentFixture<PatientMovementAddWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMovementAddWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementAddWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
