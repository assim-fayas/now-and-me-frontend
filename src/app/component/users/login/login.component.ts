import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"
import { LoginRequest } from 'src/app/models';
import { UserServiceService } from '../../../service/user-service.service'
import {first} from 'rxjs/operators'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


formSubmitted=false;
  //loading spinner
  isLoading: boolean = false

  //timer function
  startTimer: boolean = false
  remainingTime: number = 29
  timerValue!: any

  //error
  errorMsg!: string

  timer() {
    this.startTimer = true
    this.startCounter()
    console.log(this.startTimer);
    console.log(this.timerValue);
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


  constructor(
    private router: Router,
    private http: HttpClient,
    private user: UserServiceService,
  ) {

    //redirect to home if user alredy loged in 
if(this.user.userValue()){
  this.router.navigate(['/'])
}
  }


  ngOnInit() { }

  //login form data
  login(loginForm: NgForm) {
    if (!loginForm.valid) {
      console.log("invalid click");
      return

    }
    this.formSubmitted=true;
    this.isLoading = true
    //  perform the login request call 
    this.user.login(loginForm.value.email, loginForm.value.password)
    .pipe(first())
      .subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false
          this.router.navigate(['/'])
        },
        (errorMessage) => {
          this.errorMsg = errorMessage
          this.isLoading = false

        }
      )

  }
}



