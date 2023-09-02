import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { HttpClient } from "@angular/common/http"
import { first } from 'rxjs';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  formSubmitted = false;
  //loading spinner
  isLoading: boolean = false

  constructor(
    private admin: AdminServiceService,
    private http: HttpClient,
    private router: Router) {

    // redirect to asdmin dashboard if admin already7 logged in
    // if (localStorage.getItem('jwt_admin')) {
    //   this.router.navigate(['/admin'])
    // } else {
    //   this.router.navigate(['/admin/login'])
    // }
  }

  // login form data

  // error
  loginErrorMessage!: string

  Adminlogin(AdminloginForm: NgForm) {
    if (!AdminloginForm.valid) {
      return
    }
    this.formSubmitted = true;
    this.isLoading = true

    // perform the login request call
    this.admin.login(AdminloginForm.value.email, AdminloginForm.value.password)
      .pipe(first())
      .subscribe((response) => {
        console.log(response, "admin login");
        const jwtToken = response.token
        localStorage.setItem('jwt_admin', jwtToken)
        this.isLoading = false
        this.router.navigate(['/admin/admin'])

      },
        (errorMessage) => {
          this.loginErrorMessage = errorMessage
          this.isLoading = false
        }
      )
  }
}
