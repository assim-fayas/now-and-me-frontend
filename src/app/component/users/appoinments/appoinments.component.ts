import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { ExpertService } from 'src/app/service/expert.service';
import { SlotBookingService } from 'src/app/service/slot-booking.service';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.css'],
  providers: [DatePipe]
})
export class AppoinmentsComponent implements OnInit {
  activeAppoinments!: any
  activeVideoCall!: any
  previouseAppoinments!: any
  activeCalls!: any
  activateJoinButton = ''
  link!: string
  showRatingModal = false
  currentExpertId!: string
  reviewStatus = ['Poor', 'Below Average', 'Good', 'Very Good', 'Excellent']



  constructor(private appoiment: SlotBookingService, private addReview: ExpertService) { }
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
      this.getActivateVideoCall()

      this.activeAppoinments = response
      console.log(this.activeAppoinments);

    }, (error) => {
      console.log(error);

    })
  }
  getActivateVideoCall() {
    this.appoiment.getActivatedAppoinments().subscribe((response) => {
      this.getPreviouseAppoinment()
      console.log(response);
      this.activeVideoCall = response
      console.log("active video call");

      const matchingData = this.activeAppoinments
        .filter((firstItem: any) => {
          return this.activeVideoCall.some((secondItem: any) => firstItem._id === secondItem.appointment);
        })
        .map((matchedItem: any) => {
          const matchingVideoCall = this.activeVideoCall.find((item: any) => item.appointment === matchedItem._id);
          if (matchingVideoCall) {
            this.link = matchingVideoCall.link
            return {
              _id: matchedItem._id,
              link: matchingVideoCall.link
            };
          } else {
            return {}; // Provide a default empty object as a return value
          }
        });

      console.log("matching data: ", matchingData);
      this.activeCalls = matchingData

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
  isIdInActiveCalls(id: string): boolean {
    return this.activeCalls ? this.activeCalls.some((item: any) => item._id === id) : false;
  }


  openLinkInNewWindow(appoinmentId: string, expertId: string) {
    this.currentExpertId = expertId
    // should uncomment

    this.appoiment.changeAppoinmentStatus(appoinmentId).subscribe((response) => {
      console.log(response);

      this.showRatingModal = true
    }, (error) => {
      console.log(error);

    })

    window.open(this.link, '_blank');

    // this.showRatingModal = true


  }

  value!: number;// Property to store the rating value

  ratingValue() {
    this.getAppoiment()
    this.showRatingModal = false
    // This function will be called when the form is submitted
    console.log('Selected rating value:', this.value);
    // You can perform further actions with the selected value here
    this.addReview.addexpertReview(this.value, this.currentExpertId).subscribe((response) => {
      console.log(response);

    }, (error) => {
      console.log(error);

    })

  }


  closeRatingModal() {
    this.getAppoiment()
    this.showRatingModal = false

  }


}
