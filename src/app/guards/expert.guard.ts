import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfessionalGuard {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const jwtToken = localStorage.getItem('jwt_expert');
        const loginRoute = '/experts/login';
        const signupRoute = '/experts/registration';

        if (
            state.url !== loginRoute &&
            state.url !== signupRoute &&
            jwtToken === null
        ) {
            this.router.navigate(['/experts/login']);
            return false;
        } else if (
            (state.url === loginRoute &&
                jwtToken !== null)
        ) {
            this.router.navigate(['/experts/home']);
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
        const admin = localStorage.getItem('jwt_admin');
        const user = localStorage.getItem('jwt_user');
        if (admin) {
            this.router.navigate(['/admin/dashboard']);
            return false;
        } else if (user) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}