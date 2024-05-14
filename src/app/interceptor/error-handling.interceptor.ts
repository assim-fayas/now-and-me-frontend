import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserServiceService } from '../service/user-service.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  userService: UserServiceService = inject(UserServiceService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.userService.logout()

          return throwError(() => error)
        }
        return throwError(() => error)
      })
    )

  }

}
