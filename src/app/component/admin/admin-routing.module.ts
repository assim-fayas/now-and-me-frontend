import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';
import { ListExpertsComponent } from './list-experts/list-experts.component';

const routes: Routes = [{ path: 'admin', component: AdminDashboardComponent },
{ path: 'login', component: AdminLoginComponent },
{ path: 'userslist', component: AdminListUsersComponent },
{ path: 'expertslist', component: ListExpertsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
