import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenMainComponent } from './kitchen-main.component';

describe('KitchenMainComponent', () => {
  let component: KitchenMainComponent;
  let fixture: ComponentFixture<KitchenMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
