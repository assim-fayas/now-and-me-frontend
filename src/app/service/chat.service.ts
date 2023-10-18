import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Message } from '../models';
import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private readonly url = environment.api


  //user message sending

  sendMessage(message: Message) {
    return this.http.post(`${this.url}/sendMessage`, message, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        })
      )
  }

  showChats(receiverId: string, senderId: string) {
    return this.http.get(`${this.url}/showChats/receiverId/${receiverId}/senderId/${senderId}`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        })
      )
  }

  IsChatActive() {
    return this.http.get(`${this.url}/IsChatActive`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  previousChats() {
    return this.http.get(`${this.url}/previousChats`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }




}
