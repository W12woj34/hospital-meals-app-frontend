import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitianPatientDetailsComponent } from './dietitian-patient-details.component';

describe('DietitianPatientDetailsComponent', () => {
  let component: DietitianPatientDetailsComponent;
  let fixture: ComponentFixture<DietitianPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitianPatientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitianPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
