import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { ProfileService } from 'src/app/service/profile.service';
import { SlotBookingService } from 'src/app/service/slot-booking.service';
import { environment } from 'src/environments/environment';
import { Appointment } from 'src/app/models';
declare var Razorpay: any;
@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  constructor(private slot: SlotBookingService, private expertservice: ExpertService, private userDetails: ProfileService) { }

  slots!: any
  sessionCharge!: string
  userInfo!: any
  currentSlotId!: string
  consultingFee!: number
  paymentStatus = 'pending'
  currentUser!: string

  @Input() currentExpertId!: string
  @Input() bookingType!: string
  ngOnInit(): void {

    this.slot.getSlots(this.currentExpertId).subscribe((response: any) => {
      console.log(response);
      this.slots = response[0].slotes;


    }, (error) => {
      console.log(error);

    })

    this.expertservice.viewExpert(this.currentExpertId).subscribe((response: any) => {
      this.sessionCharge = response.hourlySessionCharge

    }, (error) => {
      console.log(error);

    })


    this.userDetails.userDetails().subscribe((response: any) => {
      this.userInfo = response.userDetails
      console.log(this.userInfo);

      this.currentUser = response.userDetails._id
      console.log(this.currentUser);


    }, (error) => {
      console.log(error);

    })



  }

  appoinment!: Appointment


  addAppoinment() {
    const edited = {
      expertId: this.currentExpertId,
      userId: this.currentUser,
      slotId: this.currentSlotId,
      consultingFee: this.sessionCharge,
      bookingType: this.bookingType,
      paymentStatus: this.paymentStatus
    }

    this.slot.addAppoinment(edited).subscribe((response) => {

      if (response) {
        console.log(response);
        this.ngOnInit()
      }


    }, (error) => {
      console.log(error);



    })

  }


  //razorpay payment integration

  message: any = "Payment not yet started";
  paymentId = "";
  error = "";
  title = 'NOW&ME';
  options = {
    "key": environment.razorpayKey,
    "amount": this.sessionCharge, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "NOW&ME",
    "description": "Booking Payment",
    "image": "../../../../assets/image/Groupnow me logo.png",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#f05e0a"
    }
  };
  payNow(id: string) {
    this.currentSlotId = id;
    this.error = '';
    this.options.amount = `${this.sessionCharge}00`;
    this.options.prefill.name = this.userInfo.name;
    this.options.prefill.email = this.userInfo.email;
    this.options.prefill.contact = '';
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.paymentStatus = 'success'
    console.log("payment status", this.paymentStatus);


    this.message = "Payment Done Successfully";
    console.log(this.message);
    this.addAppoinment()

  }
}
