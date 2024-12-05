import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  if(!authService.isLoggedIn()) {
    router.navigate(['login']);   
  };
 
  return true;

};
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getUser().pipe(
    map((user) => {
      if (user && authService.hasRole('admin')) {
        return true;
      } else {
        router.navigate(['dashboard']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['dasdbord']);
      return of(false);
    })
  );
};

