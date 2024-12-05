import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const gustGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isLoggedIn()) {
    router.navigate(['']);
    
  };
  
  return true;

// ngan chan viec truy cap trang login/register lien tuc
};
