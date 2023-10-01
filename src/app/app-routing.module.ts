import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


const ROUTES:Routes = [

  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'dasboard', component: DashboardComponent, pathMatch:'full'}

]



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
