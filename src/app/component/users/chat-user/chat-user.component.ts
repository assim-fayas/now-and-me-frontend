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
  chats!: any

  constructor(private expertServices: ExpertService, private chatService: ChatService, private socket: Socket) { }
  ngOnInit() {
    this.socket.connect()
    this.getExpert()
  }

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


  //get all experts for chatting note:should be changed

  getExpert() {
    this.expertServices.expertListing().subscribe((response: any) => {
      console.log(response);

      this.allExperts = response.allExperts
      this.currentUser = response.userId
    }, (error) => {
      console.log(error);

    })
  }



  //show chats

  showChats(expertId: string) {
    this.selectedExpert = expertId
    console.log(this.selectedExpert, "current expert");
    this.chatService.showChats(expertId, this.currentUser).subscribe((response: any) => {
      console.log(response);
      this.chats = response

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
    this.socket.emit('chatMessage', this.sendmessage)
    // this.chatService.sendMessage(this.sendmessage).subscribe((response) => {

    //   console.log(response);
    //   this.message = ''
    // }, (error) => {
    //   console.log(error);

    // })


  }






}
