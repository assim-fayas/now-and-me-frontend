import { Injectable } from '@angular/core';
import { User } from './user';
declare var JitsiMeetExternalAPI: any;
import { Router } from '@angular/router'; // import router from angular router
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  api: any;
  user: User;
  namePrincipalRoom: String;
  options: any;
  domain: string = 'meet.jit.si';

  // For Custom Controls
  isAudioMuted = true;
  isVideoMuted = true;

  constructor(private route: Router) {
    this.user = new User();
    this.namePrincipalRoom = 'PrincipalRoom';
  }

  moveRoom(nameRoom: String, isAdmin: Boolean): void {
    const myNode = document.getElementById('jitsi-iframe');
    myNode?.innerHTML;

    console.log('nameRoom' + nameRoom);
    console.log('prejoinPageEnabled:' + (this.user.name != '' ? true : false));

    this.options = {
      roomName: nameRoom,
      width: 900,
      height: 500,

      configOverwrite: {
        prejoinPageEnabled: this.user.name != '' ? false : true,
      },
      interfaceConfigOverwrite: {
        startAudioMuted: true,
        startVideoMuted: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
        email: 'john.doe@company.com',
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      // videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
      participantRoleChanged: this.participantRoleChanged,
      passwordRequired: this.passwordRequired,
      endpointTextMessageReceived: this.endpointTextMessageReceived,
    });
  }

  changeRouterLink(value: any) {
    console.log(value);
    this.namePrincipalRoom = value;

    const myNode = document.getElementById('jitsi-iframe');
    myNode?.innerHTML;

    this.options = {
      roomName: this.namePrincipalRoom,
      width: 900,
      height: 500,
      configOverwrite: {
        prejoinPageEnabled: false,
        openBridgeChannel: 'datachannel',
      },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

  handleClose = () => {
    console.log('handleClose');
  };

  endpointTextMessageReceived = async (event: { data: { eventData: { text: string; }; }; }) => {
    console.log('mensaje recibido');
    console.log(event);
    console.log(event.data.eventData.text);
    if ((event.data.eventData.text = 'mover a principal')) {
      this.moveRoom('grupo 1', true);
    }
  };

  passwordRequired = async () => {
    console.log('passwordRequired'); // { id: "2baa184e" }
    this.api.executeCommand('password', 'The Password');
  };

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  participantRoleChanged = async (participant: any) => {
    console.log('participantRoleChanged', participant);
    //if (participant.role === "moderator")
    {
      console.log('participantRoleChanged:', participant.role);
      this.api.executeCommand('password', 'The Password');
    }
  };

  handleParticipantJoined = async (participant: any) => {
    console.log('OJOJOJOJ  handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }

    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    /*
    displayName: "userNameTest"
formattedDisplayName: "userNameTest (me)"
id: "19563d97"
roomName: "PrincipalRoom"
*/

    this.user.setName(participant.userNameTest);
    this.namePrincipalRoom = participant.roomName;

    const data = await this.getParticipants();
  };

  // handleVideoConferenceLeft = () => {
  //   console.log('handleVideoConferenceLeft');
  //   this.route.navigate(['/experts/home']);
  // };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.route.navigate(['/experts/home']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

}
