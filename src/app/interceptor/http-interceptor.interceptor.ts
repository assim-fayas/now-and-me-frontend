import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../service/user-service.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(public userService: UserServiceService) { }




  data!: string | null
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('admin')) {
      this.data = localStorage.getItem('admintoken')
    } else {
      this.data = localStorage.getItem('jwt_user')
    }
    if (this.data) {
      let tokennized = request.clone({
        setHeaders: {
          Authorization: `${this.data}`
        }
      })
      console.log(tokennized, "tokenizeddd");
      return next.handle(tokennized);
    }
    else {

      return next.handle(request)
    }

  }
}