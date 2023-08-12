import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // backend url
  private readonly url = environment.apiBaseUrl

  private readonly userSubject: BehaviorSubject<LoginResponse | null>
  public user: Observable<LoginResponse | null>
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initializing userSubject from localStorage
    const storedUser = JSON.parse(localStorage.getItem('LoginResponse') || 'null');
    this.userSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('LoginResponse')!));
    // Making the user observable
    this.user = this.userSubject.asObservable();
  }


  userResponse!: LoginResponse

  getuUserToken() {
    let res = this.userResponse
    return (res)
  }

  // logged user detail
  userValue(): LoginResponse | null {

    console.log("user service......", this.userSubject.value);
    return this.userSubject.value


  }


  

  // Login of user
  loginErrorMessage: string = 'An Error Occurred'
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
      .pipe(map(LoginResponse => {
        //store all details and jwt token in local storage 
        localStorage.setItem('LoginResponse', JSON.stringify(LoginResponse))
        console.log(LoginResponse, "login response");
        this.userResponse = LoginResponse
        this.userSubject.next(LoginResponse)
        return LoginResponse
      }),
        catchError((errorRes) => {
          console.log("Error response from backend:", errorRes.error);
          this.loginErrorMessage= errorRes.error.message;
          return throwError(this.loginErrorMessage);
        })
      );
  }

  //change password
  PasswordErrorMessage: string="Error occured"
  changePassword(email: string) {
    return this.http.post< string>(`${this.url}/changePassword`, { email}, { withCredentials: true })
    .pipe(
      catchError(errorRes => {
        console.log("Error response from backend:", errorRes.error);
        const errorMessage = errorRes.error.message;
        console.log("error from backend reset pass",errorMessage);
        this.PasswordErrorMessage=errorMessage
        return throwError( this.PasswordErrorMessage);
      })
    );
}

//otp verification



  //user logout
  logout() {
    // remove the user from local and set the current user null
    localStorage.removeItem('LoginResponse');
    this.userSubject.next(null)
    this.router.navigate(['/login'])
  }

}