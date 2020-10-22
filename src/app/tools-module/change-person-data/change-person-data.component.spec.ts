import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePersonDataComponent } from './change-person-data.component';

describe('ChangePersonDataComponent', () => {
  let component: ChangePersonDataComponent;
  let fixture: ComponentFixture<ChangePersonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePersonDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePersonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
