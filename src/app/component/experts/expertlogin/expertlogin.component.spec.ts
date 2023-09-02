import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertloginComponent } from './expertlogin.component';

describe('ExpertloginComponent', () => {
  let component: ExpertloginComponent;
  let fixture: ComponentFixture<ExpertloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertloginComponent]
    });
    fixture = TestBed.createComponent(ExpertloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
