import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';


const ROUTES:Routes = [

  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch:'full', canActivate:[AuthGuard]}

]



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
