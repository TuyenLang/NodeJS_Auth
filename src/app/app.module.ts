import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { provideHttpClient } from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
  
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [provideHttpClient(withInterceptors([httpInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
