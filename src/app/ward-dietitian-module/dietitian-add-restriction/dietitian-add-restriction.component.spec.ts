import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitianAddRestrictionComponent } from './dietitian-add-restriction.component';

describe('DietitianAddRestrictionComponent', () => {
  let component: DietitianAddRestrictionComponent;
  let fixture: ComponentFixture<DietitianAddRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitianAddRestrictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitianAddRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
