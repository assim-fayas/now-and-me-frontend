import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { ExpertloginComponent } from './expertlogin/expertlogin.component';
import { ExpertregisterComponent } from './expertregister/expertregister.component';

const routes: Routes = [{path:'experts',component:ExpertDashboardComponent},
{path:'login',component:ExpertloginComponent},
{path:'register', component:ExpertregisterComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
