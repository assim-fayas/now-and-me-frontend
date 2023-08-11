import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError,BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // backend url
  private readonly url = environment.apiBaseUrl

private userSubject:BehaviorSubject<LoginResponse | null>
public user:Observable<LoginResponse | null>

  constructor(
    private http: HttpClient,
    private router:Router
    ) {
      // Initializing userSubject from localStorage
    this.userSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('LoginResponse')!));
    // Making the user observable
    this.user = this.userSubject.asObservable();
   }


   // logged user detail
     userValue():LoginResponse | null{
      console.log("user service",this.userSubject.value);
      
    return this.userSubject.value

   
   }
  // Login of user

  errorMessage: string = 'An Error Occurred'

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
      .pipe(map(LoginResponse=>{
        //store all details and jwt token in local storage 
        localStorage.setItem('LoginResponse',JSON.stringify(LoginResponse))
        this.userSubject.next(LoginResponse)
        return LoginResponse
      }),
        catchError((errorRes) => {
          console.log("Error response from backend:", errorRes.error);
          this.errorMessage = errorRes.error.message;
          return throwError(this.errorMessage);
        })
      );
  }

  //user logout
logout(){
  // remove the user from local and set the current user null
localStorage.removeItem('LoginResponse');
this.userSubject.next(null)
this.router.navigate(['/login'])
}

}