import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseMealsOrdersComponent } from './nurse-meals-orders.component';

describe('NurseMealsOrdersComponent', () => {
  let component: NurseMealsOrdersComponent;
  let fixture: ComponentFixture<NurseMealsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseMealsOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseMealsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
