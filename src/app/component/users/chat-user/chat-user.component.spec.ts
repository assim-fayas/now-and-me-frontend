import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserComponent } from './chat-user.component';

describe('ChatUserComponent', () => {
  let component: ChatUserComponent;
  let fixture: ComponentFixture<ChatUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatUserComponent]
    });
    fixture = TestBed.createComponent(ChatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
