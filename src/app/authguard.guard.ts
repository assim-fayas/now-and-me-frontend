import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const jwt_user = localStorage.getItem('jwt_user')
    console.log("checking of user jwt from  route guard", jwt_user);
    const loginRoute = '/login'
    const signupRoute = '/register'


    if (state.url !== loginRoute &&
      state.url !== signupRoute &&
      jwt_user === null) {
      this.router.navigate(['/login'])
      return false
    } else if ((state.url === loginRoute || state.url === signupRoute) && jwt_user !== null) {
      this.router.navigate(['/'])
      return false
    }
    return true

  }
}

@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    const admin = localStorage.getItem('jwt_admin');
    const expert = localStorage.getItem('jwt_expert');
    if (admin) {
      this.router.navigate(['/admin/admin']);
      return false;
    } else if (expert) {
      this.router.navigate(['/experts/experts']);
      return false;
    } else {
      return true;
    }
  }
}