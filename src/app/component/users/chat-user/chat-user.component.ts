import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {

  activeChats = true
  previousChats = false

  showActiveChats() {
    this.activeChats = true
    this.previousChats = false
  }

  showpreviousChats() {
    this.activeChats = false
    this.previousChats = true
  }


}
