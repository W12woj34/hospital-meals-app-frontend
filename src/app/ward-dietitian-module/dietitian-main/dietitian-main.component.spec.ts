import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitianMainComponent } from './dietitian-main.component';

describe('DietitianMainComponent', () => {
  let component: DietitianMainComponent;
  let fixture: ComponentFixture<DietitianMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitianMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitianMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
