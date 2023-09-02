import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ExpertLoginResponse } from '../models';
import { catchError,  throwError } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ExpertService  implements OnInit{

  //backend url
  private readonly url = environment.apiBaseUrl

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  expertResponse!: ExpertLoginResponse;

  // login of experts

  loginErrorMessage: string = 'An Error Occurred';
  login(email: string, password: string) {
    return this.http.post<ExpertLoginResponse>(`${this.url}/experts/login`, { email, password }, { withCredentials: true })
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


getExpertToken(){
  return localStorage.getItem('jwt_expert')
}

//expert registratttion
registerExpert(expert:any){
  return this.http.post(`${this.url}/experts/register`,expert,{ withCredentials: true })

  .pipe(
    catchError(errorRes => {
      const errorMessage = errorRes.error.message;
      return throwError(errorMessage)
    })
  )
}

registerForm1(){
  
}


// expert logout
logout(){
  localStorage.removeItem('jwt_expert');
  this.router.navigate(['/experts/login'])
}




ngOnInit(): void {
  
}

}