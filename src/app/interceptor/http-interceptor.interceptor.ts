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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('jwt_user')
    let expertToken = localStorage.getItem('jwt_expert')
    let adminToken = localStorage.getItem('jwt_admin')
    if (userToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken)
      })
      return next.handle(newRequest);

    }
    if (expertToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + expertToken)
      })
      return next.handle(newRequest);
    }
    if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + adminToken)
      })
      return next.handle(newRequest);
    }
    return next.handle(request);
  }

}
