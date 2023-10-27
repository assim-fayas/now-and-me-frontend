import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertsRoutingModule } from './experts-routing.module';
import { ExpertregisterComponent } from './expertregister/expertregister.component';
import { ExpertloginComponent } from './expertlogin/expertlogin.component';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpertOtpComponent } from './expert-otp/expert-otp.component';
import { ExpertResetpasswordComponent } from './expert-resetpassword/expert-resetpassword.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { Regform1Component } from './regform1/regform1.component';
import { Regform2Component } from './regform2/regform2.component';
import { Regform3Component } from './regform3/regform3.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { ExpertHomeComponent } from './expert-home/expert-home.component';
import { FreeSlotsComponent } from './free-slots/free-slots.component';
import { ChatsComponent } from './chats/chats.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ViewAppoinmentsComponent } from './view-appoinments/view-appoinments.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VideocallComponent } from './videocall/videocall.component';
import { PiechartComponent } from 'src/app/piechart/piechart.component';
import { BarchartComponent } from 'src/app/barchart/barchart.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingSpinnerUserComponent } from './loading-spinner-expert';
import { PickerModule } from '@ctrl/ngx-emoji-mart';




@NgModule({
  declarations: [


    ExpertregisterComponent,
    ExpertloginComponent,
    ExpertDashboardComponent,
    ExpertOtpComponent,
    ExpertResetpasswordComponent,
    MailverificationComponent,
    NavbarComponent,
    RegistrationComponent,
    Regform1Component,
    Regform2Component,
    Regform3Component,
    ExpertHomeComponent,
    FreeSlotsComponent,
    ChatsComponent,
    ReviewsComponent,
    ViewAppoinmentsComponent,
    SidebarComponent,
    VideocallComponent,
    ProfileComponent,
    LoadingSpinnerUserComponent





  ],
  imports: [
    CommonModule,
    ExpertsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CloudinaryModule,
    PiechartComponent,
    BarchartComponent,
    PickerModule



  ],

  exports: [

  ]
})
export class ExpertsModule { }
