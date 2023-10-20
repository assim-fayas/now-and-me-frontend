import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {
  domain: string = "meet.jit.si"; // For self hosted use your domain
  room!: string;
  options: any;
  api: any;
  user: any;
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.room = 'NOW&ME-Video-Meet';
    this.user = {
      name: 'Asim'
    }
    this.videoStart()
  }
  ngOnDestroy() {
    this.disposeVideoCall();
  }

  // processData() {
  //   if (this.room) {
  //     this.getDetails()
  //   }
  // }
  // getDetails() {

  //   this.videoStart()

  // };

  videoStart() {
    this.options = {
      roomName: this.room,
      configOverWrite: { proJoinPageEnabe: false },
      interfaceConfigOverWrite: {
        TILE_VIEW_MAX_COLUMNS: 8
      },
      parantNode: document.querySelector('#jist-iframe'),
      userInfo: {
        displayName: this.user.name
      }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);


    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged
    });

  }
  handleClose = () => {
    console.log("closing meet");
  }

  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/']);
  }

  handleAudioMuteStatusChanged = (audio: any) => {
    console.log("handleAudioMuteStatusChanged", audio);
  }

  handleVideoMuteStatusChanged = (video: any) => {
    console.log("handleAudioMuteStatusChanged", video);
  }

  //want to get all participants

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if (command == 'hangup') {
      this.router.navigate(['/']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  disposeVideoCall() {
    if (this.api) {
      this.api.dispose(); // Cleanup Jitsi Meet API instance
      this.api = null; // Reset the API instance
    }
  }

}