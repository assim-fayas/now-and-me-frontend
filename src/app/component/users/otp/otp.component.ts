import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{

// email of the current user
email!:string




constructor(private route:ActivatedRoute){}

ngOnInit(): void {

this.route.queryParams.subscribe((params)=>{
this.email=params['email']

// counter starts
this.timer()
})

}

//loading spinner
 isLoading: boolean = false


  //timer function
  startTimer: boolean = false
  remainingTime: number = 29
  timerValue!: any

  timer() {
   console.log("user email",this.email);
   
    this.startTimer = true
    this.startCounter()
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


  veryfyOtp(otpForm:NgForm){

  }
 
}
