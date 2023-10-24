import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';
import { Appointment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SlotBookingService {

  private readonly url = environment.api
  private readonly userUrl = environment.api
  // private readonly url = environment.expertUrl
  // private readonly userUrl = environment.apiBaseUrl
  constructor(

    private http: HttpClient,
    private router: Router
  ) { }

  //add slotes

  addSlots(startTime: string, endTime: string, date: string) {
    return this.http.post(`${this.url}/experts/addslote`, { startTime, endTime, date }, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }


  //fetching specified slot
  getSlots(id: string) {
    return this.http.get(`${this.userUrl}/getSlots/${id}`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }


  //add appoinment
  addAppoinment(appoinment: Appointment) {
    return this.http.post(`${this.userUrl}/addAppoinment`, appoinment, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }


  //get appoinments

  getVideoAppoinment() {
    return this.http.get(`${this.userUrl}/appoinmentVideo`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }
  getPreviousVideoAppoinment() {
    return this.http.get(`${this.userUrl}/previousappoinmentVideo`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))
  }


  getExpertsVideoAppoinment() {
    return this.http.get(`${this.url}/experts/appoinmentVideo`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))

  }

  getPreviousExpertVideoAppoinment() {
    return this.http.get(`${this.url}/experts/previousappoinmentVideo`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))

  }
  getActivatedAppoinments() {
    return this.http.get(`${this.url}/activateJoinButton`, { withCredentials: true }).pipe(map(response => {

      return response
    }),
      catchError((error) => {
        return throwError(error)
      }))


  }



  changeAppoinmentStatus(appoinmentId: string) {
    return this.http.post(`${this.url}/experts/changeAppoinmentStatus/${appoinmentId}`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }


}




