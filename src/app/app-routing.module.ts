import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/users/home/home.component';
import { LoginComponent } from './component/users/login/login.component';
import { RegisterComponent } from './component/users/register/register.component';
import { AuthGuard } from './authguard.guard';
const routes: Routes = [
  { path: "", component: HomeComponent ,canActivate :[AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },

  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
