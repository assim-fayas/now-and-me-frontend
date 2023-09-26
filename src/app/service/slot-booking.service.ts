import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SlotBookingService {

  private readonly url = environment.expertUrl
  constructor(

    private http: HttpClient,
    private router: Router
  ) { }

  //add slotes

  addSlots(startTime: string, endTime: string, date: string) {
    return this.http.post(`${this.url}/addSlote`, { startTime, endTime, date })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }


}




