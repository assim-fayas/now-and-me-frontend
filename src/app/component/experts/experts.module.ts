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
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CloudinaryModule } from '@cloudinary/ng';

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

  ],
  imports: [
    CommonModule,
    ExpertsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PickerModule,
    CloudinaryModule

  ],

exports: [

]
})
export class ExpertsModule { }
