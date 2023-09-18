import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../service/user-service.service';


@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(public userService: UserServiceService) { }




  data!: string | null
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("inter");

    let token = localStorage.getItem('jwt_user')
    console.log(token, "tokennnnnnnnnnn");


    if (request.url.includes('admin')) {
      this.data = localStorage.getItem('admintoken')
    } else {
      console.log("inside else");
      this.data = localStorage.getItem('jwt_user')
    }
    if (this.data) {
      console.log("inside if data undangill");
      console.log("data interceptor", this.data);

      let tokennized = request.clone({
        setHeaders: {
          Authorization: `${this.data}`
        }
      })
      console.log(tokennized, "tokenizeddd");
      return next.handle(tokennized);
    }
    else {
      console.log("there is an isuue in interceptor");

      return next.handle(request)
    }

  }
}