import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ExpertLoginResponse } from '../models';
import { catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ExpertService implements OnInit {

  //backend url
  private readonly url = environment

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  expertResponse!: ExpertLoginResponse;

  // login of experts

  loginErrorMessage: string = 'An Error Occurred';
  login(email: string, password: string) {
    return this.http.post<ExpertLoginResponse>(`{this.url}/experts/login`, { email, password }, { withCredentials: true })
      .pipe(
        map((response: ExpertLoginResponse) => {
          localStorage.setItem('jwt_expert', JSON.stringify(response));
          console.log(response);

          return response;
        }),
        catchError((errorRes) => {
          console.log("Error from backend:", errorRes.error);
          this.loginErrorMessage = errorRes.error.message;
          return throwError(this.loginErrorMessage);
        })
      );
  }


  getExpertToken() {
    return localStorage.getItem('jwt_expert')
  }

  //expert registratttion
  registerExpert(expert: any) {
    return this.http.post(`{this.url}/experts/register1`, expert, { withCredentials: true })

      .pipe(
        catchError(errorRes => {
          const errorMessage = errorRes.error.message;
          return throwError(errorMessage)
        })
      )
  }


  //registration form 1
  registerForm1(form1: any) {
    return this.http.post(`{this.url}/experts/register1`, form1, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //registration form2
  registerForm2(form2: any, id: string) {
    return this.http.post(`{this.url}/experts/register2`, { form2, id }, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //registration form3
  registerForm3(form3: any, id: string) {
    return this.http.post(`{this.url}/experts/register3`, { form3, id }, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  expertListing() {
    return this.http.get(`{this.url}/experts/expertListing`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }



  viewExpert(Expertid: string) {
    return this.http.post(`{this.url}/experts/viewExpert/${Expertid}`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  // expert logout
  logout() {
    localStorage.removeItem('jwt_expert');
    this.router.navigate(['/experts/login'])
  }




  ngOnInit(): void {

  }

}