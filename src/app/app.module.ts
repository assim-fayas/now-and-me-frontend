import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorInterceptor } from './interceptor/http-interceptor.interceptor';
import { UserServiceService } from './service/user-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloudinaryConfig } from '@cloudinary/url-gen';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/ng';





@NgModule({
  declarations: [
    AppComponent,
  
 



  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),



  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorInterceptor,
    multi: true
  }, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
