import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';
import { SupplierComponent } from './Components/dashboard/supplier/supplier.component';


const ROUTES:Routes = [

  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch:'full', canActivate:[]},
  {path: 'categories',component: CategoriesComponent, canActivate: []},
  {path: 'suppliers',component: SupplierComponent, canActivate: []},
 

]



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
