import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/service/video.service';


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {
  isAudioMuted = false

  constructor(private router: Router, private jitsiService: VideoService) { }
  ngOnInit(): void {
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, true);
  }

  executeCommand(data: any) {
    console.log(
      'this.jitsiService.getParticipants():',
      this.jitsiService.getParticipants()
    );

    this.jitsiService.api.executeCommand(
      'sendEndpointTextMessage',
      this.jitsiService.getParticipants(),
      'mover a principal'
    );

    this.jitsiService.api.executeCommand(data).subscribe((data: any) => {
      this.isAudioMuted = data
    })
  }

  //form values
  formData = {
    link: ''
  };

  submitForm() {
    // Handle the form submission
    const meetLink = this.formData.link;
    console.log('Meet Link:', meetLink);
    this.formData.link = ''
  }

  delete() {
    // Handle the delete action here.
  }
}




