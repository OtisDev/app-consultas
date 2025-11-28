import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn()){
    router.navigate(['/auth/login']);
    return false;
  }

  const allowAccess: string[] = ['/denied-access','/'];

  if(!authService.hasAccess(state.url) && !allowAccess.includes(state.url)) {
    router.navigate(['/denied-access']);
    return false;
  }


  return true;
};
