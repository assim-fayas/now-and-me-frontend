import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MailverificationComponent } from './mailverification/mailverification.component';
import { AuthGuard } from 'src/app/authguard.guard';


const routes: Routes = [
  { path: "", component: HomeComponent,canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "otp", component: OtpComponent },
  { path: "resetPassword", component: ResetPasswordComponent},
  {path:'user/:id/verify/:token',component:MailverificationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
