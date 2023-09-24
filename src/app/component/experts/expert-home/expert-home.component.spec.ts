import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertHomeComponent } from './expert-home.component';

describe('ExpertHomeComponent', () => {
  let component: ExpertHomeComponent;
  let fixture: ComponentFixture<ExpertHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertHomeComponent]
    });
    fixture = TestBed.createComponent(ExpertHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
