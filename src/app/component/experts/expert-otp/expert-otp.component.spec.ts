import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertOtpComponent } from './expert-otp.component';

describe('ExpertOtpComponent', () => {
  let component: ExpertOtpComponent;
  let fixture: ComponentFixture<ExpertOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertOtpComponent]
    });
    fixture = TestBed.createComponent(ExpertOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
