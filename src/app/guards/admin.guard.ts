import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const jwtToken = localStorage.getItem('jwt_admin');
    const loginRoute = '/admin/login';

    if (
      state.url !== loginRoute &&

      jwtToken === null
    ) {
      this.router.navigate(['/admin/login']);
      return false;
    } else if (
      (state.url === loginRoute) &&
      jwtToken !== null
    ) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    const professional = localStorage.getItem('jwt_expert');
    const user = localStorage.getItem('jwt_user');
    if (professional) {
      this.router.navigate(['/experts']);
      return false;
    } else if (user) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}