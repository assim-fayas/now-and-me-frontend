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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ChartModule } from 'primeng/chart';
import { ViewExpertComponent } from './view-expert/view-expert.component';
import { SharedModule } from 'src/app/shared/shared.module';


// import {MatTableModule} from '@angular/material/table'
// import {MatPaginatorModule}from '@angular/material/paginator'
// import {MatSortModule}from '@angular/material/sort'
// import {MatFormFieldModule}from '@angular/material/form-field'
// import{MatInputModule}from '@angular/material/input'


// const URL = environment.adminUrl

// Function to load the data from the backend
// export function loadData(dataService: DataService, httpClient: HttpClient) {
//   return () => {
//     httpClient.get(`${URL}/adminPie`).subscribe((data: any) => {
//       dataService.data = data;
//     });
//   };
// }










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
    BarchartComponent,
    PiechartComponent,
    NgxChartsModule,
    ChartModule,
    SharedModule



    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatFormFieldModule,
    // MatInputModule,




  ],

  providers: [

  ],
})
export class AdminModule { }
