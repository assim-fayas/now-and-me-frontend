import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  //user routes
  {path:'',loadChildren:()=> import('./component/users/users.module').then(m=> m.UsersModule)},
  //admin routes
  { path:'admin', loadChildren: () => import('./component/admin/admin.module').then(m => m.AdminModule) },
  //experts route
  {path:'experts',loadChildren:()=>import('./component/experts/experts.module').then(m=>m.ExpertsModule)},
  //invalid routes
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
