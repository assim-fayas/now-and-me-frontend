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
  private readonly url = environment.adminUrl


  constructor(
    private http: HttpClient,
    private router: Router) { }

  adminToken!: AdminLoginResponse

  loginErrorMessage: string = 'An Error Occured'

  // admin login
  login(email: string, password: string) {
    return this.http.post<AdminLoginResponse>(`${this.url}/login`, { email, password }, { withCredentials: true })
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
    return this.http.get(`${this.url}/listUsers`, { withCredentials: true })
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
    return this.http.get(`${this.url}/listExperts`, { withCredentials: true })
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
    return this.http.post(`${this.url}/expert/block/${id}`, { withCredentials: true })
  }
  //block  and unblock expert
  blockuser(id: string) {
    return this.http.post(`${this.url}/user/block/${id}`, { withCredentials: true })
  }


  getAdminToken() {
    return localStorage.getItem('jwt_admin')
  }


  getDashboardDetails() {
    return this.http.get(`${this.url}/dashboard`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }
  adminpieData() {
    return this.http.get(`${this.url}/adminPie`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }

  topPerfomers() {
    return this.http.get(`${this.url}/topperformers`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }
  expertRequest() {
    return this.http.get(`${this.url}/expertRequest`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }







  logout() {
    // remove the user from local and set the current user null
    localStorage.removeItem('jwt_admin');
    this.router.navigate(['/admin/login'])
  }


}

