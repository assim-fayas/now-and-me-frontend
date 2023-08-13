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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userService.userValue();
    console.log("user jwt token,",user);
    
    console.log("user in HttpInterceptorInterceptor", user);

    const isLoggedIn = user?.token;
    console.log("is Logged in(interceptor)", isLoggedIn);

    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    console.log(isApiUrl, "Api url(interceptor)");

    if (isLoggedIn && isApiUrl) {
      const tokenisedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      });

      return next.handle(tokenisedRequest); // Return the modified request
    }

    // If the conditions are not met, just pass along the original request
    return next.handle(request);
  }
}
