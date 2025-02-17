import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserRequestService} from '../api/user-request.service';
import {catchError, map, of, throwError} from 'rxjs';

export const authenticatedGuard: CanActivateFn = () => {
  const userRequestService = inject(UserRequestService);
  const router = inject(Router);
  return userRequestService.getCurrentUser().pipe(
    map((user) => {
      if (!user) throwError(() => new Error('User not found'));
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    }),
  );
};

export const unauthenticatedGuard: CanActivateFn = () => {
  const userRequestService = inject(UserRequestService);
  const router = inject(Router);
  return userRequestService.getCurrentUser().pipe(
    map((user) => {
      if (user) {
        router.navigate(['/a']);
        return false;
      }

      return true;
    }),
    catchError(() => {
      // TODO Enrique: Upon failure, we allow the login?
      return of(true);
    }),
  );
};
