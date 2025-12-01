import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let expectedRoles = route.data['allow'] as string[];
  console.log('Expected roles for this route:', route);
  return false;
  const roles = expectedRoles.includes('all') ? ['AS','SUP','U'] : expectedRoles;

  if(!authService.isLoggedIn()){
    router.navigate(['/auth/login']);
    return false;
  }

  const allowAccess: string[] = ['/denied-access','/'];


  if (authService.hasAnyRole(roles)) {
    return true;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }


  return true;
};
