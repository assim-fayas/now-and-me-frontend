import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/users/register/register.component';
import { LoginComponent } from './component/users/login/login.component';
import { HomeComponent } from './component/users/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner';
import { NavbarComponent } from './component/users/navbar/navbar.component';
import { FooterComponent } from './component/users/footer/footer.component';
import { HttpInterceptorInterceptor } from './interceptor/http-interceptor.interceptor';
import { OtpComponent } from './component/users/otp/otp.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    FooterComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorInterceptor,
    multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
