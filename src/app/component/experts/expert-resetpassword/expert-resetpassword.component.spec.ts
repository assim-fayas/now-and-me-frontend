import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertResetpasswordComponent } from './expert-resetpassword.component';

describe('ExpertResetpasswordComponent', () => {
  let component: ExpertResetpasswordComponent;
  let fixture: ComponentFixture<ExpertResetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertResetpasswordComponent]
    });
    fixture = TestBed.createComponent(ExpertResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
