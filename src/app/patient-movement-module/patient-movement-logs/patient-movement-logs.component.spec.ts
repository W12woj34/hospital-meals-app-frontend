import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementLogsComponent } from './patient-movement-logs.component';

describe('PatientMovementLogsComponent', () => {
  let component: PatientMovementLogsComponent;
  let fixture: ComponentFixture<PatientMovementLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMovementLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
