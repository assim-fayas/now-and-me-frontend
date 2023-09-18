import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  // email of the current user
  email!: string




  constructor(private route: ActivatedRoute,
    private user: UserServiceService,
    private router: Router) {


  }




  ngOnInit(): void {
  
    //flowbit
    initFlowbite()


    this.route.queryParams.subscribe((params) => {
      this.email = params['email']

    })

    // counter starts
    this.timer()



  }

  //loading spinner
  isLoading: boolean = false


  //timer function
  startTimer: boolean = false
  remainingTime: number = 29
  timerValue!: any

  timer() {
    console.log("user email", this.email);

    this.startTimer = true
    this.startCounter()

  }

  // rstarts timer and send email again
  restartTimer() {
    this.timer()
    this.isLoading = true
    this.user.otp(this.email).subscribe((response) => {
      console.log(response);
      this.isLoading = false
    },
      (errorMessage) => {

        console.log(errorMessage);

        this.isLoading = false

      })

  }


  resetTimer() {

    this.startTimer = false
    this.remainingTime = 29
    console.log(this.startTimer);
  }


  startCounter(): void {
    if (!this.startTimer) {
      return;
    }
    this.timerValue = setInterval(() => {
      if (!this.startTimer) {
        this.resetTimer();
        clearInterval(this.timerValue);
        return;
      }

      if (this.remainingTime > 1) {
        this.remainingTime--;
      } else {
        this.resetTimer();
        clearInterval(this.timerValue);
      }
    }, 1000);
  }

  //otp verification
  otpErrorMessage!: string
  veryfyOtp(otpForm: NgForm) {
    console.log("otp formnn kityeeeeeeee", otpForm.value.otp);

    if (!otpForm.valid) {
      return
    }

    // perform verification call

    this.user.verifyOtp(otpForm.value.otp).subscribe((response) => {
      if (response) {
        this.router.navigate(['/resetPassword'])
      }
    },
      (errormessage) => {
        this.otpErrorMessage = errormessage
      })

  }

}
