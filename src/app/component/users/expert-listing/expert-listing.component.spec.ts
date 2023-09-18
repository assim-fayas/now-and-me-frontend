import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertListingComponent } from './expert-listing.component';

describe('ExpertListingComponent', () => {
  let component: ExpertListingComponent;
  let fixture: ComponentFixture<ExpertListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertListingComponent]
    });
    fixture = TestBed.createComponent(ExpertListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
