import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner';
import { CarouselComponent } from 'src/app/carousel/carousel.component';
import { ExpertListingComponent } from './expert-listing/expert-listing.component';


@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MailverificationComponent,
    NavbarComponent,
    OtpComponent,
    RegisterComponent,
    ResetPasswordComponent,
    LoadingSpinnerComponent,
    ExpertListingComponent,
  
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselComponent ,
 
  ]
})
export class UsersModule { }
