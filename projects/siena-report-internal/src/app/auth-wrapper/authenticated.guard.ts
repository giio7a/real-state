import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

const isUserAuthenticated = true; // TODO Enrique: Implement authentication with server

export const authenticatedGuard: CanActivateFn = () => {
  if (!isUserAuthenticated) {
    const router = inject(Router);
    router.navigate(['/login']);
  }
  return isUserAuthenticated;
};

export const unauthenticatedGuard: CanActivateFn = () => {
  if (isUserAuthenticated) {
    const router = inject(Router);
    router.navigate(['/a']);
  }
  return !isUserAuthenticated;
};
