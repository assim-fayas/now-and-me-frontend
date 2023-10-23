import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ExpertService } from 'src/app/service/expert.service';
import { VideoService } from 'src/app/service/video.service';


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {
  isAudioMuted = false
  appoinmentDetails: any
  submitted = false





  constructor(private router: Router, private jitsiService: VideoService, private activateRoute: ActivatedRoute, private expertSservice: ExpertService) { }
  ngOnInit(): void {
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, true);

    this.activateRoute.params.subscribe((params) => {
      console.log("params", params);
      this.appoinmentDetails = params
    })
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
    link: '',
  };

  submitForm() {
    let meetLinkValue = this.formData.link;
    if (meetLinkValue) {
      this.submitted = true
      this.expertSservice.ActivateSloteOfUser(this.appoinmentDetails.appoinmentId, this.appoinmentDetails.slot_date, this.appoinmentDetails.slot_time, meetLinkValue, this.appoinmentDetails.userId).subscribe((response) => {

        this.formData.link = '';

        console.log(response);

      }, (error) => {
        this.formData.link = '';
        console.log(error);

      })
    }
  }


  delete() {
    // Handle the delete action here.
    this.expertSservice.deativateTheJoinButton(this.appoinmentDetails.appoinmentId).subscribe((response) => {

      console.log(response);


    }, (error) => {
      console.log(error);

    })
  }


}




