import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEstComponent } from './components/dashboard-est/dashboard-est.component';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},                                                                               
  {path: 'dashboard/001', component: DashboardAdminComponent},
  {path: 'dashboard/010', component: DashboardProfComponent},
  {path: 'dashboard/100', component: DashboardEstComponent},
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
