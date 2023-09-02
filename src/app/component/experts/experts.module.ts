import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertsRoutingModule } from './experts-routing.module';
import { ExpertregisterComponent } from './expertregister/expertregister.component';
import { ExpertloginComponent } from './expertlogin/expertlogin.component';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
 
  
    ExpertregisterComponent,
         ExpertloginComponent,
         ExpertDashboardComponent
  ],
  imports: [
    CommonModule,
    ExpertsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ExpertsModule { }
