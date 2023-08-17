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
import { ResetPasswordComponent } from './component/users/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { AdminListUsersComponent } from './component/admin/admin-list-users/admin-list-users.component';
import { MailverificationComponent } from './component/users/mailverification/mailverification.component'
import { UserServiceService } from './service/user-service.service';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    FooterComponent,
    OtpComponent,
    ResetPasswordComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminListUsersComponent,
    MailverificationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorInterceptor,
    multi:true
  },
      UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
