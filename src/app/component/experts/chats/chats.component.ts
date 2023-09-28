import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Message } from 'src/app/models';
import { Socket } from 'ngx-socket-io';
import { ExpertService } from 'src/app/service/expert.service';
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
  chats: any[] = [];
  receivedMessage!: any

  constructor(private userServices: UserServiceService, private chatService: ChatService, private socket: Socket, private expertService: ExpertService) { this.socket.connect() }

  ngOnInit() {

    this.userServices.getusers().subscribe((response: any) => {
      this.currentExpert = response.expertid

      this.allUsers = response.allUser

      console.log("log inside function", this.currentExpert);

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





    this.socket.emit("abc", "aaaaaaaaaaaaaaaaaaa")






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
      this.currentExpert = response.expertid
      console.log(response.allUser);

      this.allUsers = response.allUser

      console.log("log inside function", this.currentExpert);

    }, (error) => {
      console.log(error);

    })
  }


  showChats(userId: string) {
    console.log("inside show chat");


    this.selectedUser = userId
    console.log(this.selectedUser, "current user");
    this.chatService.showChats(userId, this.currentExpert).subscribe((response: any) => {
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        // Assuming messages are stored in the 'messages' property
        this.chats = response[0].messages;
        console.log(this.chats, "kalyaanee");
      }
      // console.log(response, "responseeeeeeee");
      // console.log(this.chats, "responseeeeeeeeeeeeeeeeeeee");
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

    this.chatService.sendMessage(this.sendmessage).subscribe((response) => {
      console.log(response);
      this.message = ''
    }, (error) => {
      console.log(error);

    })


  }

  // getExpertId() {
  //   this.expertServices().getExpertId.subscribe((response: string) => {
  //     console.log(response);

  //   }, (error) => {
  //     console.log(error);

  //   })
  // }





  //side bar opening
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}