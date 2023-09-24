import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSlotsComponent } from './free-slots.component';

describe('FreeSlotsComponent', () => {
  let component: FreeSlotsComponent;
  let fixture: ComponentFixture<FreeSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeSlotsComponent]
    });
    fixture = TestBed.createComponent(FreeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
