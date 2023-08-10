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

  constructor(private userService:UserServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    return next.handle(request);
  }
}
