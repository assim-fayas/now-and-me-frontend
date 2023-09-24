import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Message } from 'src/app/models';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  isSidebarOpen = false;
  activeChats = true
  previousChats = false
  allUsers!: any
  selectedUser!: string
  currentExpert!: string
  message!: string
  chats!: any

  constructor(private userServices: UserServiceService, private chatService: ChatService) { }

  ngOnInit() {
    this.getUsers()
  }

  showActiveChats() {
    this.activeChats = true
    this.previousChats = false

  }

  showpreviousChats() {
    this.activeChats = false
    this.previousChats = true
  }


  //get all users for chatting note: should be changed

  getUsers() {
    this.userServices.getusers().subscribe((response: any) => {
      console.log(response.allUser);

      this.allUsers = response.allUser
      this.currentExpert = response.expertid
    }, (error) => {
      console.log(error);

    })
  }


  showChats(userId: string) {
    this.selectedUser = userId
    console.log(this.selectedUser, "current user");
    this.chatService.showChats(userId, this.currentExpert).subscribe((response: any) => {
      console.log(response);
      this.chats = response

    }, (error) => {
      console.log(error);

    })

  }


  sendmessage: Message = {
    sender: this.currentExpert,
    receiver: this.selectedUser,
    text: this.message,
    senderType: "expert",
    receiverType: "user",
    receiverId: this.selectedUser

  }

  onSubmit() {

    console.log('Submitted message:', this.message);
    this.sendmessage = {
      sender: this.currentExpert,
      receiver: this.selectedUser,
      text: this.message,
      senderType: "expert",
      receiverType: "user",
      receiverId: this.selectedUser

    }

    this.chatService.sendMessage(this.sendmessage).subscribe((response) => {
      console.log(response);
      this.message = ''
    }, (error) => {
      console.log(error);

    })


  }









  //side bar opening
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}