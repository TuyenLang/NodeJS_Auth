import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { gustGuard } from './core/guards/gust.guard';
import { adminGuard, authGuard } from './core/guards/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
 {path:'',component:LayoutComponent,
  children:[
    {path:'', redirectTo:'dashboard',pathMatch:'full'},
  
    {path: 'login',canActivate:[gustGuard], component: LoginComponent},
    {path: 'register', canActivate:[gustGuard],component: RegisterComponent},
    {path:'dashboard', canActivate:[authGuard], component:DashboardComponent},
    {
      path: 'user',
      canActivate: [authGuard],
      data: { role: 'user' }, // Chỉ user mới truy cập được
       component: UserComponent
    },
    {
      path: 'admin',
      canActivate: [adminGuard],
      data: { role: '' }, // Chỉ admin mới truy cập được
       component: AdminComponent
    }
    // {
    //   path: 'guest',
    //   loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule),
    // },
    // // {
    // //   path: 'user',
    // //   loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    // //   canActivate: [authGuard],
    // //   data: { role: 'user' }, // Chỉ user mới truy cập được
    // // },
    // // {
    // //   path: 'admin',
    // //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // //   canActivate: [authGuard],
    // //   data: { role: 'admin' }, // Chỉ admin mới truy cập được
    // // },
    // {
    //   path: 'unauthorized',
    //   component: UnauthorizedComponent, // Trang hiển thị nếu không có quyền
    // },
    // // { path: '**', redirectTo: '/guest' },
 
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
