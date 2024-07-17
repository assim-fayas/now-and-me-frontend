import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListExpertsComponent } from './list-experts/list-experts.component';
import { NavsidebarComponent } from './navsidebar/navsidebar.component';
import { FlagComponent } from './flag/flag.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PiechartComponent } from 'src/app/piechart/piechart.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'primeng/chart';
import { ViewExpertComponent } from './view-expert/view-expert.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminListUsersComponent,
    AdminLoginComponent,
    ListExpertsComponent,
    NavsidebarComponent,
    FlagComponent,
    ProfileComponent,
    ViewExpertComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TagModule,
    TooltipModule,
    PiechartComponent,
    NgxChartsModule,
    ChartModule,
    SharedModule
  ],

  providers: [],
})
export class AdminModule { }
