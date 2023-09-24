import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppoinmentsComponent } from './view-appoinments.component';

describe('ViewAppoinmentsComponent', () => {
  let component: ViewAppoinmentsComponent;
  let fixture: ComponentFixture<ViewAppoinmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppoinmentsComponent]
    });
    fixture = TestBed.createComponent(ViewAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
