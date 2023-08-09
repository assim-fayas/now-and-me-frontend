import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // backend url
  private readonly url = environment.apiBaseUrl

  constructor(private http: HttpClient) { }
  //login of user
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
      .pipe( //error handling
        catchError((errorRes) => {
          let errorMessage = 'An Error Occured';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
          }
          switch (errorRes.error.error.message) {
            case "user not found":
              errorMessage = "user not found"
              break;
            case "password not match":
              errorMessage = "password not match"
              break;
            case "your account is suspended":
              errorMessage = "your account is suspended"
              break;
            case "An Email has been sent to your account please Verify":
              errorMessage = 'An Email has been sent to your account please Verify'
              break;
            case "Error in user login":
              errorMessage = 'Error in user login'
              break;
          }
          return throwError(errorMessage)
        })
      )
  }

}