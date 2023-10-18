import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
import { SupplierComponent } from './Components/dashboard/supplier/supplier.component';
import { MasterComponent } from './Components/master/master.component';
import { HeaderMainComponent } from './Components/header-main/header-main.component';
import { GeneralBarComponent } from './Components/general-bar/general-bar.component';
import { ProductsComponent } from './Components/dashboard/products/products.component';
import { GeneralInformationComponent } from './Components/dashboard/general-information/general-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoriesComponent,
    SupplierComponent,
    MasterComponent,
    HeaderMainComponent,
    GeneralBarComponent,
    ProductsComponent,
    GeneralInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
