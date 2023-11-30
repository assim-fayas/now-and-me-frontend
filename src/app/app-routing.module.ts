import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
const routes: Routes = [
  //user routes
  { path: '', loadChildren: () => import('./component/users/users.module').then(m => m.UsersModule) },
  //admin routes
  { path: 'admin', loadChildren: () => import('./component/admin/admin.module').then(m => m.AdminModule) },
  //experts route
  { path: 'experts', loadChildren: () => import('./component/experts/experts.module').then(m => m.ExpertsModule) },
  //invalid routes
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
