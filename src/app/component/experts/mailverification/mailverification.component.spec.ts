import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailverificationComponent } from './mailverification.component';

describe('MailverificationComponent', () => {
  let component: MailverificationComponent;
  let fixture: ComponentFixture<MailverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailverificationComponent]
    });
    fixture = TestBed.createComponent(MailverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
