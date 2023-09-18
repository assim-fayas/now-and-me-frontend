import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AdminLoginResponse } from '../models';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  // backend url
  private readonly url = environment.apiBaseUrl


  constructor(
    private http: HttpClient,
    private router: Router) { }

  adminToken!: AdminLoginResponse

  loginErrorMessage: string = 'An Error Occured'

  // admin login
  login(email: string, password: string) {
    return this.http.post<AdminLoginResponse>(`${this.url}/admin/login`, { email, password }, { withCredentials: true })
      .pipe(map(AdminLoginResponse => {
        localStorage.setItem('jwt_admin', JSON.stringify(AdminLoginResponse))
        console.log(AdminLoginResponse, "admin response");
        return AdminLoginResponse

      }),

        catchError((error) => {
          console.log("response from backend:", error.error);
          this.loginErrorMessage = error.error.message
          return throwError(this.loginErrorMessage)
        })
      )
  }

  //list all users
  getuserErrorMessage: string = 'An Error Occured'
  getusers() {
    return this.http.get<any>(`${this.url}/admin/listUsers`, { withCredentials: true })
      .pipe(map(response => {
        return response

      }),
        catchError((error) => {
          console.log("error response from backend", error.error);
          this.getuserErrorMessage = error.error.message
          return throwError(this.getuserErrorMessage)
        })

      )
  }

  //list all expert
  getexpertErrorMessage: string = 'An Error Occured'
  getexperts() {
    return this.http.get<any>(`${this.url}/admin/listExperts`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          console.log("error response from backend", error.error);
          this.getexpertErrorMessage = error.error.message
          return throwError(this.getexpertErrorMessage)

        })
      )
  }

  //block  and unblock expert
  blockexpert(id: string) {
    return this.http.post(`${this.url}/admin/expert/block/${id}`, { withCredentials: true })
  }
  //block  and unblock expert
  blockuser(id: string) {
    return this.http.post(`${this.url}/admin/user/block/${id}`, { withCredentials: true })
  }


  getAdminToken() {
    return localStorage.getItem('jwt_admin')
  }

  logout() {
    // remove the user from local and set the current user null
    localStorage.removeItem('jwt_admin');
    this.router.navigate(['/admin/login'])
  }


}

