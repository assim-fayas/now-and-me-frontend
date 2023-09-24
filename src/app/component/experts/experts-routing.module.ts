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
import { ExpertHomeComponent } from './expert-home/expert-home.component';
import { FreeSlotsComponent } from './free-slots/free-slots.component';
import { ChatsComponent } from './chats/chats.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewAppoinmentsComponent } from './view-appoinments/view-appoinments.component';

const routes: Routes = [{ path: '', component: ExpertDashboardComponent },
{ path: 'login', component: ExpertloginComponent },
{ path: 'registration', component: RegistrationComponent },
{ path: 'register', component: ExpertregisterComponent },
{ path: 'otp', component: ExpertOtpComponent },
{ path: 'resetPassword', component: ExpertResetpasswordComponent },
{ path: 'expert/:id/verify/:token', component: MailverificationComponent },
{ path: 'regform1', component: Regform1Component },
{ path: 'regform2/:id', component: Regform2Component },
{ path: 'regform3/:id', component: Regform3Component },
{ path: 'home', component: ExpertHomeComponent },
{ path: 'slots', component: FreeSlotsComponent },
{ path: 'chat', component: ChatsComponent },
{ path: 'reviews', component: ReviewsComponent },
{ path: 'appoinments', component:ViewAppoinmentsComponent },
{ path: 'sidebar', component:SidebarComponent },
//invalid routes
{ path: '**', redirectTo: '/experts' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
