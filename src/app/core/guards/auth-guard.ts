import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let expectedRoles = route.children[0].data['allow'] as string[];

  const roles = expectedRoles.includes('all') ? ['AS','SUP','U'] : expectedRoles;

  if(!authService.isLoggedIn()){
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.hasAnyRole(roles)) {
    return true;
  } else {
    authService.logout(false);
    router.navigate(['/auth/login']);
    return false;
  }

};
