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
import { BarchartComponent } from 'src/app/barchart/barchart.component';
import { PiechartComponent } from 'src/app/piechart/piechart.component';
import { ProfileComponent } from './profile/profile.component';




// import {MatTableModule} from '@angular/material/table'
// import {MatPaginatorModule}from '@angular/material/paginator'
// import {MatSortModule}from '@angular/material/sort'
// import {MatFormFieldModule}from '@angular/material/form-field'
// import{MatInputModule}from '@angular/material/input'


@NgModule({
  declarations: [AdminDashboardComponent,
    AdminListUsersComponent,
    AdminLoginComponent,

    ListExpertsComponent,
    NavsidebarComponent,
    FlagComponent,
    ProfileComponent,





  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TagModule,
    TooltipModule,
    BarchartComponent,
    PiechartComponent


    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatFormFieldModule,
    // MatInputModule,




  ],
})
export class AdminModule { }
