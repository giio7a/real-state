import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {UserRequestService} from '../api/user-request.service';
import {catchError, map, of, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {GlobalActions} from '../store/global.actions';

export const authenticatedGuard: CanActivateFn = () => {
  const userRequestService = inject(UserRequestService);
  const store = inject(Store);
  return userRequestService.getCurrentUser().pipe(
    map((user) => {
      if (!user) throwError(() => new Error('User not found'));
      return true;
    }),
    catchError(() => {
      // Clearing token. The navigation is done automatically due to another effect.
      store.dispatch(GlobalActions.setAuthToken({token: undefined}));
      return of(false);
    }),
  );
};

export const unauthenticatedGuard: CanActivateFn = () => {
  const userRequestService = inject(UserRequestService);
  const store = inject(Store);
  return userRequestService.getCurrentUser().pipe(
    map((user) => {
      if (user) {
        // No token needs to be set, because the only way to get here is by having a token already. Just navigate.
        store.dispatch(GlobalActions.routeToHome());
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
