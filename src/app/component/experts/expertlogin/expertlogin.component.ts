import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"
import { LoginResponse } from 'src/app/models';
import { ExpertService } from 'src/app/service/expert.service';
import { first } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-expertlogin',
  templateUrl: './expertlogin.component.html',
  styleUrls: ['./expertlogin.component.css']
})
export class ExpertloginComponent implements OnInit {


  formSubmitted = false;
  //loading spinner
  isLoading: boolean = false

  constructor(
    private router: Router,
    private http: HttpClient,
    private user: ExpertService,
    public toastr: ToastrService
  ) {

    // redirect to home if user alredy loged in 
    if (localStorage.getItem('jwt_expert')) {
      this.router.navigate(['/experts/home'])
    } else {
      this.router.navigate(['/experts/login'])
    }
  }


  //login form data

  //error
  loginErrorMessage!: string

  login(loginForm: NgForm) {


    if (!loginForm.valid) {

      return

    }
    console.log("inside form login");
    this.formSubmitted = true;
    this.isLoading = true
    //  perform the login request call 
    this.user.login(loginForm.value.email, loginForm.value.password)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log(response, "loginnnnn");
          const jwtToken = response.token
          localStorage.setItem('jwt_expert', jwtToken)
          this.isLoading = false
          this.router.navigate(['/experts/home'])
        },
        (errorMessage) => {
          this.isLoading = false
          this.toastr.error(errorMessage, 'oops😕', {
            timeOut: 2000,
            positionClass: 'toast-top-center'
          });

        }
      )

  }


  //forgot password

  // userEmail!: string
  // PasswordErrorMessage!: string

  // forgotPassword(modalForm: NgForm) {
  //   console.log("inside modalll");

  //   if (!modalForm.valid) {
  //     console.log("invalid form");
  //     return
  //   }
  //   this.isLoading = true
  //   this.userEmail = modalForm.value.email
  //perform request call

  // this.user.otp(modalForm.value.email).subscribe((response: any) => {
  //   const jwtToken = response.token;
  //   console.log(jwtToken, "jwt_expert");

  //   this.isLoading = false
  //   this.router.navigate(['/experts/otp'], { queryParams: { email: this.userEmail } })
  // },
  //   (errorMessage) => {

  //     this.PasswordErrorMessage = errorMessage
  //     this.isLoading = false

  //   })


  // }


  ngOnInit() { }


}


