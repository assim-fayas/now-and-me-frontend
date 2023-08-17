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
            jwt_user=== null) {
            this.router.navigate(['/login'])
            return false
        } else if ((state.url === loginRoute || state.url === signupRoute) && jwt_user !== null){
            this.router.navigate(['/login'])
            return false          
        }
        return true

    }
}