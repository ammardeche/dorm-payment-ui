import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const requiredRoles: string[] = route.data['roles'];
  const hasRole = requiredRoles.some((role) => _authService.hasRole(role));

  if (hasRole) return true;

  _router.navigate(['/dashboard']);
  return false;
};
