import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { ExpertService } from 'src/app/service/expert.service';
import { Message } from 'src/app/models';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {

  allExperts!: any
  selectedExpert!: string
  currentUser!: string
  message!: string
  chats: any[] = []
  receivedMessage!: any
  ActiveChats!: any
  previousChatdocs!: any

  constructor(private expertServices: ExpertService, private chatService: ChatService, private socket: Socket) { this.socket.connect() }
  ngOnInit() {
    this.chatService.previousChats().subscribe((response: any) => {
      console.log(response, "previouse chats");
      this.previousChatdocs = response
    }, (error) => {
      console.log(error);

    })

    this.chatService.IsChatActive().subscribe((response: any) => {
      this.ActiveChats = response
      console.log(response, "active chats");

    }, (error) => {
      console.log(error);

    })
    this.expertServices.expertListing().subscribe((response: any) => {
      this.allExperts = response.allExperts
      this.currentUser = response.userId

      this.socket.on(response.userId, (message: any) => {
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

  activeChats = true
  previousChats = false

  showActiveChats() {
    this.activeChats = true
    this.previousChats = false
    this.selectedExpert = ''
  }

  showpreviousChats() {
    this.activeChats = false
    this.previousChats = true
    this.selectedExpert = ''
  }





  //show chats

  showChats(expertId: string) {

    this.selectedExpert = expertId

    console.log(this.selectedExpert, "current expert");

    this.chatService.showChats(expertId, this.currentUser).subscribe((response: any) => {
      console.log(response, "full response");
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
    sender: this.currentUser,
    receiver: this.selectedExpert,
    text: this.message,
    senderType: "user",
    receiverType: "expert",
    receiverId: this.selectedExpert

  }

  onSubmit() {

    console.log('Submitted message:', this.message);
    this.sendmessage = {
      sender: this.currentUser,
      receiver: this.selectedExpert,
      text: this.message,
      senderType: "user",
      receiverType: "expert",
      receiverId: this.selectedExpert

    }
    this.chats = [...this.chats, this.sendmessage];
    this.socket.emit('chatMessage', this.sendmessage)
    this.message = ''


  }



}
