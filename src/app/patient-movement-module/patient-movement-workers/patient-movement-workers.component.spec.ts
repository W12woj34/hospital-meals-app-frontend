import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementWorkersComponent } from './patient-movement-workers.component';

describe('PatientMovementWorkersComponent', () => {
  let component: PatientMovementWorkersComponent;
  let fixture: ComponentFixture<PatientMovementWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMovementWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
