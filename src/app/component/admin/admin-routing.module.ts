import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';
import { ListExpertsComponent } from './list-experts/list-experts.component';
import { NavsidebarComponent } from './navsidebar/navsidebar.component';
import { FlagComponent } from './flag/flag.component';
import { ProfileComponent } from './profile/profile.component';




const routes: Routes = [{
  path: '', component: AdminDashboardComponent
},
{ path: 'login', component: AdminLoginComponent },
{ path: 'userslist', component: AdminListUsersComponent },
{ path: 'expertslist', component: ListExpertsComponent },
{ path: 'navsidebar', component: NavsidebarComponent },
{ path: 'flag', component: FlagComponent },
{ path: 'profile', component: ProfileComponent },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
