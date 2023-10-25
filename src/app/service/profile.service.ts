import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { UserProfile } from '../models';
import { ExpertProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, router: Router) { }

  private readonly url = environment.api


  userDetails() {
    return this.http.get(`${this.url}/userDetails`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }

  updateProfile(profile: UserProfile) {
    return this.http.put(`${this.url}/updateProfile`, profile, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  adminProfile() {
    return this.http.get(`${this.url}/admin/adminProfile`, { withCredentials: true }).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))

  }
  expertProfile() {
    return this.http.get(`${this.url}/experts/expertProfile`, { withCredentials: true }).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }


  updateExpertProfile(expertProfile: ExpertProfile, id: string) {
    return this.http.post(`${this.url}/experts/updateExpertProfile/${id}`, expertProfile, { withCredentials: true }).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }



}

