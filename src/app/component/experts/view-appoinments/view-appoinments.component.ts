import { Component, OnInit } from '@angular/core';
import { SlotBookingService } from 'src/app/service/slot-booking.service';

@Component({
  selector: 'app-view-appoinments',
  templateUrl: './view-appoinments.component.html',
  styleUrls: ['./view-appoinments.component.css']
})
export class ViewAppoinmentsComponent implements OnInit {


  activeAppoinments!: any
  previouseAppoinments!: any
  activateJoinButton = ''
  constructor(private appoiment: SlotBookingService) { }

  ngOnInit(): void {
    this.getAppoinments()

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



  getAppoinments() {
    this.appoiment.getExpertsVideoAppoinment().subscribe((response) => {
      this.getPreviouseAppoinment()
      this.activeAppoinments = response
      console.log(this.activeAppoinments);

    }, (error) => {
      console.log(error);

    })


  }

  getPreviouseAppoinment() {
    this.appoiment.getPreviousExpertVideoAppoinment().subscribe((response) => {

      this.previouseAppoinments = response
      console.log("previouse appoinmentsss", this.previouseAppoinments);

    }, (error) => {
      console.log(error);

    })

  }



}
