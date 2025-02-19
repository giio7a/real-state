import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAuthToken} from '../store';
import {switchMap, take} from 'rxjs';
import {AppSettings} from '../app.settings';
import {GlobalActions} from '../store/global.actions';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const authToken$ = store.select(selectAuthToken);

  return authToken$.pipe(
    take(1),
    switchMap((authToken) => {
      if (authToken) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        return next(clonedRequest);
      } else {
        return next(req);
      }
    }),
  );
};

export const initialTokenLoad = (store: Store) => {
  const token = localStorage.getItem(AppSettings.authTokenLocalStorageKey);
  if (token) {
    store.dispatch(GlobalActions.setAuthToken({token}));
  }
};
