import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpertComponent } from './view-expert.component';

describe('ViewExpertComponent', () => {
  let component: ViewExpertComponent;
  let fixture: ComponentFixture<ViewExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExpertComponent]
    });
    fixture = TestBed.createComponent(ViewExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
