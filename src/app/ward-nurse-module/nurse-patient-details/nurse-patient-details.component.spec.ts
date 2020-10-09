import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePatientDetailsComponent } from './nurse-patient-details.component';

describe('NursePatientDetailsComponent', () => {
  let component: NursePatientDetailsComponent;
  let fixture: ComponentFixture<NursePatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePatientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
