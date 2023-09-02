import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListExpertsComponent } from './list-experts/list-experts.component';


@NgModule({
  declarations: [AdminDashboardComponent,
    AdminListUsersComponent,
  AdminLoginComponent,
  NavbarComponent,
  SidebarComponent,
  ListExpertsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
})
export class AdminModule { }
