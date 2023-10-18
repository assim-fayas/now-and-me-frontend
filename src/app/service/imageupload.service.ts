import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {
  constructor(private http: HttpClient) { }

  private readonly cloudUrl = environment


  uploadImage(value: any) {
    return this.http.post(`${this.cloudUrl}/upload`, value)
  }






}
