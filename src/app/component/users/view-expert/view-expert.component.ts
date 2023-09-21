import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { environment } from 'src/environments/environment';

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


  constructor(private activateRouter: ActivatedRoute, private expertService: ExpertService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      this.currentExpertId = params['id']
      this.viewExpert()

    })
  }


  viewExpert() {
    this.expertService.viewExpert(this.currentExpertId).subscribe((response) => {
      this.expertView = response
    }, (error) => {
      console.log(error);

    })
  }


  showText() {
    this.isReadMore = !this.isReadMore;
  }




  //razorpay payment integration

  message: any = "Payment not yet started";
  paymentId = "";
  error = "";
  title = 'NOW&ME';
  options = {
    "key": environment.razorpayKey,
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
    this.paymentId = '';
    this.error = '';
    this.options.amount = '50000';
    this.options.prefill.name = '';
    this.options.prefill.email = 'youremail@gmail.com';
    this.options.prefill.contact = '9876543210';
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
    this.message = "Payment Done Successfully";
    console.log(this.message);

  }














}
