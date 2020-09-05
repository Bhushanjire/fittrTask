import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromocodeComponent } from './promocode/promocode.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'customer', component: CustomerComponent
      },
      {
        path: 'admin', component: PromocodeComponent
      },
      { path: '', redirectTo: '/admin',pathMatch : 'full' }


    ]
  },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
