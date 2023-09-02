import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { ExpertloginComponent } from './expertlogin/expertlogin.component';
import { ExpertregisterComponent } from './expertregister/expertregister.component';
import { ExpertOtpComponent } from './expert-otp/expert-otp.component';
import { ExpertResetpasswordComponent } from './expert-resetpassword/expert-resetpassword.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { RegistrationComponent } from './registration/registration.component';
import { Regform1Component } from './regform1/regform1.component';
import { Regform2Component } from './regform2/regform2.component';
import { Regform3Component } from './regform3/regform3.component';

const routes: Routes = [{path:'experts',component:ExpertDashboardComponent},
{path:'login',component:ExpertloginComponent},
{path:'registration',component:RegistrationComponent},
{path:'register', component:ExpertregisterComponent},
{path:'otp', component:ExpertOtpComponent},
{path:'resetPassword', component:ExpertResetpasswordComponent},
{path:'expert/:id/verify/:token',component:MailverificationComponent},
{path:'regform1',component:Regform1Component},
{path:'regform2',component:Regform2Component},
{path:'regform3',component:Regform3Component},
  //invalid routes
  // { path: '**', redirectTo:'experts' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
