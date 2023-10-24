import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
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
  showRatingModal!: false
  constructor(private appoiment: SlotBookingService, private router: Router) { }

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

  isTimeToDisplayButton(appointment: any): boolean {
    console.log("inside is time to display button");

    const currentTime = new Date();
    const slotDateTime = this.parseSlotDateTime(appointment.scheduledAt.slot_date, appointment.scheduledAt.slot_time);

    // Compare both date and time
    return currentTime >= slotDateTime;
  }

  private parseSlotDateTime(dateString: string, timeString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hours24 = parseInt(hours);

    // Convert to 24-hour format if necessary
    if (period.toLowerCase() === 'pm' && hours24 < 12) {
      hours24 += 12;
    }

    const slotDateTime = new Date(year, month - 1, day, hours24, parseInt(minutes), 0, 0); // Month is 0-based in JavaScript

    return slotDateTime;
  }

  sendDetail(appoinmentId: string, slot_date: string, slot_time: string, user_id: string) {


    this.router.navigate(['/experts/videomeet', { appoinmentId: appoinmentId, slot_date: slot_date, slot_time: slot_time, userId: user_id }])

  }


}
