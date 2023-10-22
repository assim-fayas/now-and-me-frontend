import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { SlotBookingService } from 'src/app/service/slot-booking.service';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.css'],
  providers: [DatePipe]
})
export class AppoinmentsComponent implements OnInit {
  activeAppoinments!: any
  previouseAppoinments!: any
  activateJoinButton = ''
  constructor(private appoiment: SlotBookingService) { }
  ngOnInit() {
    this.getAppoiment()


  }

  schedules: boolean = true
  previouseSchedules: boolean = false

  showSchedules() {
    this.schedules = true
    this.previouseSchedules = false
  }
  showpreviouseSchedules() {
    this.schedules = false
    this.previouseSchedules = true
  }


  getAppoiment() {

    this.appoiment.getVideoAppoinment().subscribe((response) => {
      this.getPreviouseAppoinment()
      this.activeAppoinments = response
      console.log(this.activeAppoinments);

    }, (error) => {
      console.log(error);

    })
  }
  getPreviouseAppoinment() {
    this.appoiment.getPreviousVideoAppoinment().subscribe((response) => {

      this.previouseAppoinments = response
      console.log("previouse appoinmentsss", this.previouseAppoinments);

    }, (error) => {
      console.log(error);

    })

  }



}
