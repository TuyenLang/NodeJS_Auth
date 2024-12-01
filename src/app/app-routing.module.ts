import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
 {path:'',component:LayoutComponent,
  children:[
    {path:'', redirectTo:'dashboard',pathMatch:'full'},
  
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path:'dashboard', component:DashboardComponent}
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
