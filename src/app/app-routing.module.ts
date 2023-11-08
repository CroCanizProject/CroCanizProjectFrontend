import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';
import { SupplierComponent } from './Components/dashboard/supplier/supplier.component';
import { ProductsComponent } from './Components/dashboard/products/products.component';
import { GeneralInformationComponent } from './Components/dashboard/general-information/general-information.component';
import { UsersComponent } from './Components/users/users.component';
import { SalesComponent } from './Components/dashboard/sales/sales.component';

const ROUTES:Routes = [

  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch:'full', canActivate:[]},
  {path: 'users',component: UsersComponent, canActivate: []},
  {path: 'generalInformation',component: GeneralInformationComponent, canActivate: []},
  {path: 'categories',component: CategoriesComponent, canActivate: []},
  {path: 'suppliers',component: SupplierComponent, canActivate: []},
  {path: 'products',component: ProductsComponent, canActivate: []},
  {path: 'generalInformation',component: GeneralInformationComponent, canActivate: []},
  {path: 'sales',component: SalesComponent, canActivate: []},

]



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
