import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regform3Component } from './regform3.component';

describe('Regform3Component', () => {
  let component: Regform3Component;
  let fixture: ComponentFixture<Regform3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Regform3Component]
    });
    fixture = TestBed.createComponent(Regform3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
