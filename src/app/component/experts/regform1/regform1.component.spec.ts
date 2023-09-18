import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regform1Component } from './regform1.component';

describe('Regform1Component', () => {
  let component: Regform1Component;
  let fixture: ComponentFixture<Regform1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Regform1Component]
    });
    fixture = TestBed.createComponent(Regform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
