import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit{

  // backend url
  private readonly url = environment.apiBaseUrl
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

ngOnInit(): void {
  
}


  userResponse!: LoginResponse

  getuUserToken() {
    return localStorage.getItem('jwt_user');
  }


  // logged user detail
  // userValue(): LoginResponse | null {

  //   console.log("user service......", this.userSubject.value);
  //   return this.userSubject.value


  // }


  

  // Login of user
  loginErrorMessage: string = 'An Error Occurred'
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
      .pipe(map(LoginResponse => {
        //store all details and jwt token in local storage 

        localStorage.setItem('LoginResponse', JSON.stringify(LoginResponse))
        console.log(LoginResponse, "login response");
        return LoginResponse
      }),
        catchError((errorRes) => {
          console.log("Error response from backend:", errorRes.error);
          this.loginErrorMessage= errorRes.error.message;
          return throwError(this.loginErrorMessage);
        })
      );
  }

  //otp generating
  PasswordErrorMessage: string="Error occured"
 otp(email: string) {
    return this.http.post< string>(`${this.url}/otp`, { email}, { withCredentials: true })
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
verifyOtp(otp:string){
  return this.http.post<string>(`${this.url}/veryfyOtp`,{otp},{withCredentials:true})
  .pipe(
    catchError(errorRes=>{
      const errorMessage=errorRes.error.message;
      console.log("Eror Rsponse from backend:",errorMessage);
      return throwError( errorMessage);
    })
  )
}

//password resetting
restPassword(password:string){
  return this.http.post<string>(`${this.url}/changePassword`,{password},{withCredentials:true})
  .pipe(
    catchError(errorRes=>{
      const errorMessage=errorRes.error.message;
      return throwError(errorMessage)
    })
  )
}


//user registration

registerUser(user:any){
  return this.http.post(`${this.url}/register`,user,{withCredentials:true})
  .pipe(
    catchError(errorRes=>{
      const errorMessage=errorRes.error.message;
      return throwError(errorMessage)
    })
  )
}



  //user logout
  logout() {
    // remove the user from local and set the current user null
    localStorage.removeItem('jwt_user');
    // this.userSubject.next(null)
    this.router.navigate(['/login'])
  }

}