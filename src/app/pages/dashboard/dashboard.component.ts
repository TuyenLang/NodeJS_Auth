import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '../../core/models/common.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  authService = inject(AuthService);
  user!: User;

  ngOnInit(): void {
    this.authService.me().subscribe({
      next:(response) => {
        console.log(response);
        if (response.data) {
          this.user = response.data;
        }
      }
    })
  }

  logout(){
    this.authService.logout();
  
  };

}
