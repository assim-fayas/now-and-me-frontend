import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';
import { ListExpertsComponent } from './list-experts/list-experts.component';
import { NavsidebarComponent } from './navsidebar/navsidebar.component';
import { FlagComponent } from './flag/flag.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewExpertComponent } from './view-expert/view-expert.component';
import { AdminGuard, ConsecutiveGuard } from 'src/app/guards/admin.guard';





const routes: Routes = [{
  path: '', component: AdminDashboardComponent, canActivate: [AdminGuard, ConsecutiveGuard]
},
{ path: 'login', component: AdminLoginComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'userslist', component: AdminListUsersComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'expertslist', component: ListExpertsComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'navsidebar', component: NavsidebarComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'flag', component: FlagComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'viewExpert', component: ViewExpertComponent, canActivate: [AdminGuard, ConsecutiveGuard] },
{ path: 'profile', component: ProfileComponent, canActivate: [AdminGuard, ConsecutiveGuard] }






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
