import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"
import { LoginResponse } from 'src/app/models';
import { UserServiceService } from '../../../service/user-service.service'
import { first } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formSubmitted = false;
  //loading spinner
  isLoading: boolean = false

  constructor(
    private router: Router,
    private http: HttpClient,
    private user: UserServiceService,
    public toastr: ToastrService
  ) {

    //redirect to home if user alredy loged in 
    if (localStorage.getItem('jwt_user')) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/login'])
    }
  }


  //login form data

  //error
  loginErrorMessage!: string

  login(loginForm: NgForm) {
    if (!loginForm.valid) {

      return

    }
    this.formSubmitted = true;
    this.isLoading = true
    //  perform the login request call 
    this.user.login(loginForm.value.email, loginForm.value.password)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log(response, "loginnnnn");
          const jwtToken = response.token
          localStorage.setItem('jwt_user', jwtToken)
          this.isLoading = false
          this.router.navigate(['/'])
        },
        (errorMessage) => {
          this.isLoading = false
          this.toastr.error(errorMessage, 'oops😕', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        }
      )

  }


  //forgot password

  userEmail!: string
  PasswordErrorMessage!: string

  forgotPassword(modalForm: NgForm) {
    console.log("inside modalll");

    if (!modalForm.valid) {
      console.log("invalid form");
      return
    }
    this.isLoading = true
    this.userEmail = modalForm.value.email
    //perform request call

    this.user.otp(modalForm.value.email).subscribe((response: any) => {
      const jwtToken = response.token;
      console.log(jwtToken, "jwt");

      this.isLoading = false
      this.router.navigate(['/otp'], { queryParams: { email: this.userEmail } })
    },
      (errorMessage) => {

        this.PasswordErrorMessage = errorMessage
        this.isLoading = false

      })


  }


  ngOnInit() {

  }




  loginWithGoogle() {

  }


}
