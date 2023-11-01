import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class appUserService {
    constructor(private http: HttpClient) { }

    loadProfile() {
        return this.http.get(`${environment.api}/userDetails`, { withCredentials: true })
    }

}