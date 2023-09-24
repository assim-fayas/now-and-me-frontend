import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {

  // backend url
  private readonly url = environment.apiBaseUrl


  constructor(

    private http: HttpClient,
    private router: Router
  ) { }



  ngOnInit(): void {

  }


  userResponse!: LoginResponse



  // Login of user
  loginErrorMessage: string = 'An Error Occurred'
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
      .pipe(map(LoginResponse => {
        //store all details and jwt token in local storage 

        localStorage.setItem('jwt_user', JSON.stringify(LoginResponse))
        console.log(LoginResponse, "login response");
        return LoginResponse
      }),
        catchError((errorRes) => {
          console.log("Error response from backend:", errorRes.error);
          this.loginErrorMessage = errorRes.error.message;
          return throwError(this.loginErrorMessage);
        })
      );
  }

  getuUserToken() {
    return localStorage.getItem('jwt_user');
  }

  getUserId(): string | null {
    const jwtUser = localStorage.getItem('jwt_user');
    if (jwtUser) {
      const parsedUser = JSON.parse(jwtUser)
      return parsedUser._id; // Adjust this based on your JWT structure
    }
    return null;
  }

  //otp generating
  PasswordErrorMessage: string = "Error occured"
  otp(email: string) {
    return this.http.post<string>(`${this.url}/otp`, { email }, { withCredentials: true })
      .pipe(
        catchError(errorRes => {
          console.log("Error response from backend:", errorRes.error);
          const errorMessage = errorRes.error.message;
          console.log("error from backend reset pass", errorMessage);
          this.PasswordErrorMessage = errorMessage
          return throwError(this.PasswordErrorMessage);
        })
      );
  }

  //otp verification
  verifyOtp(otp: string) {
    return this.http.post<string>(`${this.url}/veryfyOtp`, { otp }, { withCredentials: true })
      .pipe(
        catchError(errorRes => {
          const errorMessage = errorRes.error.message;
          console.log("Eror Rsponse from backend:", errorMessage);
          return throwError(errorMessage);
        })
      )
  }

  //password resetting
  restPassword(password: string) {
    return this.http.post<string>(`${this.url}/changePassword`, { password }, { withCredentials: true })
      .pipe(
        catchError(errorRes => {
          const errorMessage = errorRes.error.message;
          return throwError(errorMessage)
        })
      )
  }


  //user registration

  registerUser(user: User) {
    return this.http.post(`${this.url}/register`, user, { withCredentials: true })
      .pipe(
        catchError(errorRes => {
          const errorMessage = errorRes.error.message;
          return throwError(errorMessage)
        })
      )
  }


  //list all users
  getusers() {
    return this.http.get(`${this.url}/listUsers`, { withCredentials: true })
      .pipe(map(response => {
        return response

      }),
        catchError((error) => {
          console.log("error response from backend", error.error);

          return throwError(error)
        })

      )
  }

  //user logout
  logout() {
    // remove the user from local and set the current user null
    localStorage.removeItem('jwt_user');
    this.router.navigate(['/login'])
  }

}