import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePatientRegistrationComponent } from './nurse-patient-registration.component';

describe('NursePatientRegistrationComponent', () => {
  let component: NursePatientRegistrationComponent;
  let fixture: ComponentFixture<NursePatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePatientRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
