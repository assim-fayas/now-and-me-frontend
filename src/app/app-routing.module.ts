import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/users/home/home.component';
import { LoginComponent } from './component/users/login/login.component';
import { RegisterComponent } from './component/users/register/register.component';
import { AuthGuard } from './authguard.guard';
import { OtpComponent } from './component/users/otp/otp.component';
import { ResetPasswordComponent } from './component/users/reset-password/reset-password.component'
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "otp", component: OtpComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  //admin routes
  {path:"admin",component:AdminLoginComponent, canActivate: [AuthGuard]},
  {path:"admin/dashboard",component:AdminDashboardComponent, canActivate: [AuthGuard]},


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
