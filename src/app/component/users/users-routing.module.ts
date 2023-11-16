import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { AuthGuard, ConsecutiveGuard } from 'src/app/authguard.guard';
import { ExpertListingComponent } from './expert-listing/expert-listing.component';
import { CommunityComponent } from './community/community.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewExpertComponent } from './view-expert/view-expert.component';



const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [ConsecutiveGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: "otp", component: OtpComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  { path: 'user/:id/verify/:token', component: MailverificationComponent },
  { path: 'expertlisting', component: ExpertListingComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: 'expertView/:id', component: ViewExpertComponent }

  // {path:'**',redirectTo:""}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
