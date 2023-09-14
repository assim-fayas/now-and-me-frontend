import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { AuthGuard, ConsecutiveGuard } from 'src/app/authguard.guard';
import { CarouselComponent } from 'src/app/carousel/carousel.component';
import { ExpertListingComponent } from './expert-listing/expert-listing.component';
import { CommunityComponent } from './community/community.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [ConsecutiveGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard, ConsecutiveGuard] },
  { path: "otp", component: OtpComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  { path: 'user/:id/verify/:token', component: MailverificationComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'expertlisting', component: ExpertListingComponent, canActivate: [AuthGuard,ConsecutiveGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard,ConsecutiveGuard] },
  {path:'schedules',component:SchedulesComponent},
  {path:'profile',component:ProfileComponent}

  // {path:'**',redirectTo:""}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
