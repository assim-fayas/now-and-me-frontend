import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { ProfileService } from 'src/app/service/profile.service';
import { SlotBookingService } from 'src/app/service/slot-booking.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr'
declare var Razorpay: any;
@Component({
  selector: 'app-view-expert',
  templateUrl: './view-expert.component.html',
  styleUrls: ['./view-expert.component.css']
})
export class ViewExpertComponent implements OnInit {
  isReadMore = true;
  currentExpertId!: string
  expertView!: any
  showSlots: boolean = false
  bookingType = ''
  paymentStatus = 'pending'
  sessionCharge!: string
  userInfo!: any
  currentUser!: string
  chatOfferModal = false
  //loading spinner
  isLoading: boolean = false
  constructor(private activateRouter: ActivatedRoute, private expertService: ExpertService, private bookChat: SlotBookingService, private userDetails: ProfileService, public toastr: ToastrService) {

  }

  ngOnInit() {


    this.activateRouter.params.subscribe(params => {
      this.currentExpertId = params['id']
      this.viewExpert()

    })
    this.isLoading = true
    this.userDetails.userDetails().subscribe((response: any) => {
      this.userInfo = response
      console.log("response userrrr", response);

      console.log("user", response._id);

      this.currentUser = response._id
      console.log(this.currentUser);

      this.isLoading = false
    }, (error) => {
      console.log(error);
      this.isLoading = false
    })

    setTimeout(() => {
      this.chatOfferModall();
    }, 3000);
  }


  viewExpert() {
    this.isLoading = true
    this.expertService.viewExpert(this.currentExpertId).subscribe((response: any) => {
      this.expertView = response
      console.log(response);


      this.sessionCharge = response.hourlySessionCharge
      this.isLoading = false
    }, (error) => {
      console.log(error);
      this.isLoading = false
    })
  }


  showText() {
    this.isReadMore = !this.isReadMore;
  }


  BookVideo() {
    if (this.showSlots == false) {
      this.showSlots = true
      this.bookingType = 'video'
    } else {
      this.showSlots = false
      this.bookingType = ''
    }
  }


  BookChat() {
    this.bookingType = 'chat'
    this.addAppoinment()


  }
  addAppoinment() {
    const edited = {
      expertId: this.currentExpertId,
      userId: this.currentUser,
      consultingFee: this.sessionCharge,
      bookingType: this.bookingType,
      paymentStatus: this.paymentStatus
    }

    this.bookChat.addAppoinment(edited).subscribe((response: any) => {


      if (response.message == "please compleate payment") {

        this.payNow()
      } else {

        this.toastr.info('You can go to Appoinment Section', 'Horrayyy 🎉', {
          timeOut: 4000,
        });
      }



    }, (error: any) => {
      console.log(error);
      this.toastr.error(error.error.message, 'oops😕', {
        timeOut: 1500,
      });


    })

  }


  chatOfferModall() {
    this.chatOfferModal = true
  }
  closechatOfferModal() {
    this.chatOfferModal = false
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
  payNow() {

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
    this.toastr.success('Payment Done Successfully', 'Horrayyy 🎉', {
      timeOut: 2000,
    });

    this.addAppoinment()
  }




  hexToDecimal(hexValue: string): number {
    return parseInt(hexValue.slice(-3), 16);
  }








}
