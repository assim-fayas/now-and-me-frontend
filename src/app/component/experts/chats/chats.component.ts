import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Message } from 'src/app/models';
import { Socket } from 'ngx-socket-io';
import { ExpertService } from 'src/app/service/expert.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  activeChats = true
  previousChats = false
  allUsers!: any
  selectedUser!: string
  currentExpert!: string
  message!: string
  chats: any[] = [];
  receivedMessage!: any
  loadingspinner = false

  constructor(private userServices: UserServiceService, private chatService: ChatService, private socket: Socket, private expertService: ExpertService) { this.socket.connect() }



  ngOnInit() {
    this.loadingspinner = true
    this.userServices.getusers().subscribe((response: any) => {
      this.currentExpert = response.expertid

      this.allUsers = response.allUser
      this.loadingspinner = false

      this.socket.on(response.expertid, (message: any) => {
        console.log("message received successfully", message);
        this.receivedMessage = {
          reciverId: message.receiver,
          reciverType: message.receiverType,
          senderId: message.sender,
          senderType: message.senderType,
          text: message.text,
        };
        console.log(this.chats, "chat aneee");
        console.log(this.receivedMessage, "new chat aaaane");


        this.chats = [...this.chats, this.receivedMessage];
        console.log(this.chats, "chatssssss");
      });
    }, (error) => {
      console.log(error);

    })

  }


  //emoji mart

  public isEmojiPickerVisible!: boolean;
  public addEmoji(event: any) {
    this.message = `${this.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
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
    this.loadingspinner = true
    this.userServices.getusers().subscribe((response: any) => {
      this.currentExpert = response.expertid

      console.log(response.allUser);

      this.allUsers = response.allUser

      console.log("log inside function", this.currentExpert);
      this.loadingspinner = false
    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })
  }


  showChats(userId: string) {

    console.log("inside show chat");


    this.selectedUser = userId
    console.log(this.selectedUser, "current user");
    this.chatService.showChats(userId, this.currentExpert).subscribe((response: any) => {
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        this.chats = response[0].messages;
        console.log(this.chats, "kalyaanee");
      }
      console.log(this.chats, "kalyaanee");



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
    this.chats = [...this.chats, this.sendmessage];
    this.socket.emit('chatMessage', this.sendmessage)
    this.message = ''
  }





  //side bar opening
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  ngOnDestroy(): void {

  }


}