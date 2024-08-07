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
  isLoading: boolean = false
  allExperts!: any
  selectedExpert!: string
  currentUser!: string
  message!: string
  chats: any[] = []
  receivedMessage!: any
  ActiveChats!: any
  previousChatdocs!: any



  //emoji mart

  public isEmojiPickerVisible!: boolean;
  public addEmoji(event: any) {
    this.message = `${this.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }




  constructor(private expertServices: ExpertService, private chatService: ChatService, private socket: Socket) { this.socket.connect() }
  ngOnInit() {
    this.isLoading = true
    this.chatService.previousChats().subscribe((response: any) => {
      console.log(response, "previouse chats");
      this.previousChatdocs = response
      this.isLoading = false
    }, (error) => {
      console.log(error);
      this.isLoading = false

    })

    this.chatService.IsChatActive().subscribe((response: any) => {
      this.ActiveChats = response
      console.log(response, "active chats");

    }, (error) => {
      console.log(error);
      this.isLoading = false
    })
    this.isLoading = true
    this.expertServices.expertListing().subscribe((response: any) => {
      this.isLoading = false
      this.allExperts = response.allExperts
      this.currentUser = response.userId
      this.isLoading = false

      this.socket.on(response.l, (message: any) => {
        console.log("message received successfully", message);
        this.receivedMessage = {
          reciverId: message.receiver,
          reciverType: message.receiverType,
          senderId: message.sender,
          senderType: message.senderType,
          text: message.text,
        };
 


        this.chats = [...this.chats, this.receivedMessage];
 
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



    this.chatService.showChats(expertId, this.currentUser).subscribe((response: any) => {
      console.log(response, "full response");
      if (Array.isArray(response) && response.length > 0) {
        this.chats = response[0].messages;
      
      }


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

  hexToDecimal(hexValue: string): number {
    return parseInt(hexValue?.slice(-2), 16);

  }
  hexToDecimalExperts(hexValue: string): number {
    return parseInt(hexValue?.slice(-3), 16);
  }


}
